#include <lib/debug.h>
#include "import.h"

#define PAGESIZE 4096
#define VM_USERLO 0x40000000
#define VM_USERHI 0xF0000000
#define VM_USERLO_PI (VM_USERLO / PAGESIZE)
#define VM_USERHI_PI (VM_USERHI / PAGESIZE)

/**
 * Allocate a physical page.
 *
 * 1. First, implement a naive page allocator that scans the allocation table (AT)
 *    using the functions defined in import.h to find the first unallocated page
 *    with normal permissions.
 *    (Q: Do you have to scan the allocation table from index 0? Recall how you have
 *    initialized the table in pmem_init.)
 *    Then mark the page as allocated in the allocation table and return the page
 *    index of the page found. In the case when there is no available page found,
 *    return 0.
 * 2. Optimize the code using memoization so that you do not have to
 *    scan the allocation table from scratch every time.
 */

static unsigned int last_allocated_page = 0;

unsigned int palloc()
{
  unsigned int nps = get_nps();

  if (nps == 0) {
    return 0;
  }

  // Naive page allocation
  for (unsigned int page_index = 0; page_index < nps; page_index++) {
      if (at_is_norm(page_index) && at_is_allocated(page_index) == 0) {
          at_set_allocated(page_index, 1);
          last_allocated_page = page_index;
          return page_index;
      }
  }


  // Memoization - If no page found in the naive allocation, we start from last allocated page
  if (last_allocated_page != 0) {
      for (unsigned int page_index = last_allocated_page; page_index < nps; page_index++) {
          if (at_is_norm(page_index) && at_is_allocated(page_index) == 0) {
              at_set_allocated(page_index, 1);
              last_allocated_page = page_index;
              return page_index;
          }
      }
  }


  return 0;

}

/**
 * Free a physical page.
 *
 * This function marks the page with given index as unallocated
 * in the allocation table.
 *
 * Hint: Simple.
 */
void pfree(unsigned int pfree_index)
{
    at_set_allocated(pfree_index, 0);
}



