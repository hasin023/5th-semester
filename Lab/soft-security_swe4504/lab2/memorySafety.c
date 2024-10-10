#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{

    char fullName[] = "Md. Ishmam Uddin";

    char *ptrName = (char *)malloc(strlen(fullName) + 1);
    strncpy(ptrName, fullName, strlen(fullName));
    printf("My name is %s\n", ptrName);

    free(ptrName);

    int *ptrSalary = (int *)malloc(sizeof(int));

    *ptrSalary = 1000;
    printf("My salary is %d\n", *ptrSalary);

    *ptrSalary = 2000;
    printf("After promotion my salary will be %d\n", *ptrSalary);

    free(ptrSalary);

    char *alphabet = (char *)malloc(27);

    for (int i = 0; i < 26; i++)
        alphabet[i] = i + 'A';
    alphabet[26] = '\0';

    char *revAlphabet = alphabet - 26;
    for (int i = 0; i < 26; i++)
        revAlphabet[i] = 'Z' - i;
    revAlphabet[26] = '\0';

    // You need to print A-Z
    printf("%s\n", revAlphabet);

    return 0;
}
