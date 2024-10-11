#include <lib/gcc.h>
#include <lib/x86.h>
#include <lib/debug.h>

#include "import.h"

#define PT_PERM_UP 0
#define PT_PERM_PTU (PTE_P | PTE_W | PTE_U)

/**
 * Page directory pool for NUM_IDS processes.
 * mCertiKOS maintains one page structure for each process.
 * Each PDirPool[index] represents the page directory of the page structure
 * for the process # [index].
 * In mCertiKOS, we statically allocate page directories, and maintain the second
 * level page tables dynamically.
 * The unsigned int * type is meant to suggest that the contents of the array
 * are pointers to page tables. In reality they are actually page directory
 * entries, which are essentially pointers plus permission bits. The functions
 * in this layer will require casting between integers and pointers anyway and
 * in fact any 32-bit type is fine, so feel free to change it if it makes more
 * sense to you with a different type.
 */
unsigned int *PDirPool[NUM_IDS][1024] gcc_aligned(PAGESIZE); // Aligns the PDirPool to a PAGE_SIZE boundary (4KB)

/**
 * In mCertiKOS, we use identity page table mappings for the kernel memory.
 * IDPTbl is an array of statically allocated identity page tables that will be
 * reused for all the kernel memory.
 * That is, in every page directory, the entries that fall into the range of
 * addresses reserved for the kernel will point to an entry in IDPTbl.
 */
unsigned int IDPTbl[1024][1024] gcc_aligned(PAGESIZE); // Aligns the IDPTbl to a PAGE_SIZE boundary (4KB)

// Sets the CR3 register with the start address of the page structure for process # [index].
void set_pdir_base(unsigned int index)
{
    set_cr3(PDirPool[index]);
}

// Returns the page directory entry # [pde_index] of the process # [proc_index].
// This can be used to test whether the page directory entry is mapped.
unsigned int get_pdir_entry(unsigned int proc_index, unsigned int pde_index)
{
    return (unsigned int)PDirPool[proc_index][pde_index];
}

// Sets the specified page directory entry with the start address of physical
// page # [page_index].
// You should also set the permissions PTE_P, PTE_W, and PTE_U.
void set_pdir_entry(unsigned int proc_index, unsigned int pde_index,
                    unsigned int page_index)
{
    unsigned int physical_address = page_index * 4096;                                  // convert to 4kb physical address page, 2^12 = 4096
    PDirPool[proc_index][pde_index] = (unsigned int *)(physical_address | PT_PERM_PTU); // combine physical address with permissions
}

// Sets the page directory entry # [pde_index] for the process # [proc_index]
// with the initial address of page directory # [pde_index] in IDPTbl.
// You should also set the permissions PTE_P, PTE_W, and PTE_U.
// This will be used to map a page directory entry to an identity page table.
void set_pdir_entry_identity(unsigned int proc_index, unsigned int pde_index)
{
    unsigned int identity_page_table_address = (unsigned int)IDPTbl[pde_index];                    // get the address of the identity page table
    PDirPool[proc_index][pde_index] = (unsigned int *)(identity_page_table_address | PT_PERM_PTU); // combine address with permissions
}

// Removes the specified page directory entry (sets the page directory entry to 0).
// Don't forget to cast the value to (unsigned int *).
void rmv_pdir_entry(unsigned int proc_index, unsigned int pde_index)
{
    PDirPool[proc_index][pde_index] = (unsigned int *)0;
}

// Returns the specified page table entry.
// Do not forget that the permission info is also stored in the page directory entries.
unsigned int get_ptbl_entry(unsigned int proc_index, unsigned int pde_index,
                            unsigned int pte_index)
{
    unsigned int *page_table = (unsigned int *)((unsigned int)(PDirPool[proc_index][pde_index]) & 0xfffff000); // Mask out the lower 12 bits of an address, zeroing out the permission, keeping only the page address
    return page_table[pte_index];                                                                              // physical address and permissions
}

// Sets the specified page table entry with the start address of physical page # [page_index]
// You should also set the given permission.
void set_ptbl_entry(unsigned int proc_index, unsigned int pde_index,
                    unsigned int pte_index, unsigned int page_index,
                    unsigned int perm)
{
    unsigned int *page_table = (unsigned int *)ADDR_MASK(PDirPool[proc_index][pde_index]);
    page_table[pte_index] = (page_index * 4096) | perm; // combine physical address with permissions
}

// Sets up the specified page table entry in IDPTbl as the identity map.
// You should also set the given permission.
void set_ptbl_entry_identity(unsigned int pde_index, unsigned int pte_index,
                             unsigned int perm)
{
    unsigned int addr = (pte_index * 4096);     // 2^12 = 4KB for physical address page
    IDPTbl[pde_index][pte_index] = addr | perm; // combine address with permissions
}

// Sets the specified page table entry to 0.
void rmv_ptbl_entry(unsigned int proc_index, unsigned int pde_index,
                    unsigned int pte_index)
{
    unsigned int *page_table = (unsigned int *)ADDR_MASK(PDirPool[proc_index][pde_index]);
    page_table[pte_index] = 0; // set to 0
}
