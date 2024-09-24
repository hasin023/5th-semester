#include <stdio.h>
#include <string.h>

void AverageFinder(int array_v[], size_t size_)
{
    double sum_ = 0;

    for (size_t i = 0; i < size_; ++i)
    {
        array_v[i] = i;
        sum_ += array_v[i];
        printf("%f \n", sum_);
    }

    printf("%f \n", sum_);
    printf("%lf \n", sum_ / size_);
}

void take_info()
{
    int age;
    char name[10];
    char address[10];
    char email[15];

    printf("Enter your name : ");
    fgets(name, sizeof(name), stdin);

    printf("\nEnter your age : ");
    scanf("%d", &age);
    getchar(); // Reads the newline from scanf()

    printf("\nEnter your email : ");
    fgets(email, sizeof(email), stdin);

    printf("\nEnter your address : ");
    fgets(address, sizeof(address), stdin);

    printf("\n\nName : %s", name);
    printf("Age : %d\n", age);
    printf("Address : %s", address);
    printf("Email : %s", email);
}

void whats_wrong_1()
{
    char s[50] = "";

    printf("Enter a name : ");
    // getchar();
    gets(s);

    strcat(s, " is the best!!");
    printf("\n%s\n", s);

    size_t s_len = strlen(s);
    printf("String size : %d\n", s_len);
}

void whats_wrong_2()
{
    const char s1[8] = "Network";
    const char s2[10] = " Security";
    const char s3[18];

    strncat(s3, s1, strlen(s1));
    strncat(s3, s2, strlen(s2));

    printf("%s\n", s3);

    strncpy(s1, s3, strlen(s1));

    printf("%s", s1);
    printf("\n");
}

int main()
{
    // Task 0 Update the code so that your code follows
    // the first standard, We have discussed.
    int v[10];
    int size_v = sizeof(v) / sizeof(v[0]);
    // Task 1 Update the code so that it calculates the
    // average of the 10 array elements
    AverageFinder(v, size_v);

    // Task 2 Update the code so that it scans and prints
    // all the information correctly
    take_info();

    // Task 3 Update the code so that correct string size
    // gets printed
    whats_wrong_1();

    // Task 4 Update the code so that unnecessary information
    // does not get printed
    whats_wrong_2();

    return 0;
}
