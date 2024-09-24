#include <stdio.h>
#include <string.h>

void clear_fn(int array_v[], size_t array_size)
{
    for (size_t i = 0; i < array_size; ++i)
    {
        array_v[i] = 0;
    }
}

void call_clear_fn()
{
    size_t sz = 12;
    int dis[sz];

    for (size_t i = 0; i < sz; i++)
    {
        dis[i] = i + 1;
    }

    clear_fn(dis, sz);

    for (size_t i = 0; i < sz; i++)
    {
        printf("%d\n", dis[i]);
    }
}

void take_st()
{
    size_t sz = 0;
    printf("Enter the size of the string: ");
    scanf("%ld", &sz);
    getchar();

    char st[sz];

    printf("Enter string: ");
    for (size_t i = 0; i < sz; ++i)
    {
        scanf("%c", &st[i]);
    }
    st[sz] = '\0';

    printf("You entered: %s\n", st);
}

void print_size_st()
{
    const char s[] = "abc";

    int string_length = strlen(s);
    printf("%d", string_length);
    printf("\n");
}

void null_problem()
{
    char a[16];
    char b[16];
    char c[16];

    strncpy(a, "1234567890abcdef", sizeof(a) - 1);
    a[15] = '\0';
    strcpy(c, a);

    printf("%s", c);
    printf("\n");
}

int main()
{
    // Task 0 Update the code so that your code follows
    // the first standard, We have discussed.

    // Task 1 Update the code so that all the elements
    // of dis array is 0
    call_clear_fn();

    // Task 2 Update the code so that only the defined size
    // gets printed
    take_st();

    // Task 3 Update the code so that correct string size
    // gets printed
    print_size_st();

    // Task 4 Update the code so that uncessary information
    // does not get printed
    null_problem();

    return 0;
}
