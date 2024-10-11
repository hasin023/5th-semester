#include <lib/debug.h>
#include <lib/x86.h>
#include "import.h"

struct SContainer
{
    int quota;     // maximum number of pages that ID i is allowed to use
    int usage;     // number of pages that ID i has currently allocated for itself or distributed to children
    int parent;    // the ID of the parent of i (or 0 if i = 0)
    int nchildren; // the number of children of i
    int used;      // boolean saying whether or not ID i is in use
};

// mCertiKOS supports up to NUM_IDS processes
static struct SContainer CONTAINER[NUM_IDS];

/**
 * Initializes the container data for the root process (the one with index 0).
 * The root process is the one that gets spawned first by the kernel.
 */
void container_init(unsigned int mbi_addr)
{
    unsigned int real_quota;

    pmem_init(mbi_addr);
    real_quota = 0;

    /**
     * Compute the available quota and store it into the variable real_quota.
     * It should be the number of the unallocated pages with the normal permission
     * in the physical memory allocation table.
     */

    for (int i = 0; i < get_nps(); i++)
    {
        // Find number of unallocated pages with normal permission
        if (at_is_allocated(i) == 0)
        {
            if (at_is_norm(i) == 1)
            {
                real_quota++;
            }
        }
    }
    KERN_DEBUG("\nreal quota: %d %d\n\n", real_quota, get_nps());

    CONTAINER[0].quota = real_quota; // root process has the maximum quota
    CONTAINER[0].usage = 0;
    CONTAINER[0].parent = 0; // As this is the root process, it has parent set to 0
    CONTAINER[0].nchildren = 0;
    CONTAINER[0].used = 1;
}

// Get the id of parent process of process # [id].
unsigned int container_get_parent(unsigned int id)
{
    // If we have remaining IDs in NUM_IDS, then return the parent ID.
    if (id < NUM_IDS)
    {
        return CONTAINER[id].parent;
    }

    return 0;
}

// Get the number of children of process # [id].
unsigned int container_get_nchildren(unsigned int id)
{
    if (id < NUM_IDS)
    {
        return CONTAINER[id].nchildren;
    }

    return 0;
}

// Get the maximum memory quota of process # [id].
unsigned int container_get_quota(unsigned int id)
{
    if (id < NUM_IDS)
    {
        return CONTAINER[id].quota;
    }

    return 0;
}

// Get the current memory usage of process # [id].
unsigned int container_get_usage(unsigned int id)
{
    if (id < NUM_IDS)
    {
        return CONTAINER[id].usage;
    }

    return 0;
}

// Determines whether the process # [id] can consume an extra
// [n] pages of memory. If so, returns 1, otherwise, returns 0.
unsigned int container_can_consume(unsigned int id, unsigned int n)
{
    if (id < NUM_IDS)
    {
        if (CONTAINER[id].quota - CONTAINER[id].usage >= n)
        {
            return 1;
        }

        return 0;
    }

    return 0;
}

/**
 * Dedicates [quota] pages of memory for a new child process.
 * You can assume it is safe to allocate [quota] pages
 * (the check is already done outside before calling this function).
 * Returns the container index for the new child process.
 */
unsigned int container_split(unsigned int id, unsigned int quota)
{
    unsigned int child_id, number_of_children; // id of the new child container, current number of children for parent

    number_of_children = CONTAINER[id].nchildren;
    child_id = id + number_of_children + 1; // unique id formula based on parent id and current number of children

    // If the child index is out of range, return NUM_IDS.
    if (child_id >= NUM_IDS)
    {
        return NUM_IDS;
    }

    /**
     * Update the container structure of both parent and child process appropriately.
     */
    CONTAINER[id].nchildren++;
    CONTAINER[id].usage += quota; // Increase the usage of parent by the quota of the child

    CONTAINER[child_id].quota = quota;
    CONTAINER[child_id].usage = 0;
    CONTAINER[child_id].parent = id;
    CONTAINER[child_id].nchildren = 0;
    CONTAINER[child_id].used = 1;

    return child_id;
}

/**
 * Allocates one more page for process # [id], given that this will not exceed the quota.
 * The container structure should be updated accordingly after the allocation.
 * Returns the page index of the allocated page, or 0 in the case of failure.
 */
unsigned int container_alloc(unsigned int id)
{
    if (container_can_consume(id, 1))
    {
        for (unsigned int i = 0; i < get_nps(); i++)
        {
            if (at_is_allocated(i) == 0 && at_is_norm(i) == 1)
            {
                palloc();
                CONTAINER[id].usage++; // Increase the usage of the container by 1

                return i; // Index for the allocated page
            }
        }
    }

    return 0;
}

// Frees the physical page and reduces the usage by 1.
void container_free(unsigned int id, unsigned int page_index)
{
    if (page_index < get_nps() && at_is_allocated(page_index))
    {
        pfree(page_index);

        if (CONTAINER[id].usage > 0) // If the usage is greater than 0
        {
            CONTAINER[id].usage--; // Decrease the usage of the container by 1
        }
    }
}
