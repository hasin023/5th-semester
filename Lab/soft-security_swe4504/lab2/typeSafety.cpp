#include <iostream>
#include <type_traits>

using namespace std;

class Duck
{
    bool rubber;

public:
    void setRubber(bool value)
    {
        rubber = value;
    }

    virtual void quack()
    {
        if (rubber)
            cout << "Artificial Quack" << '\n';
        else
            cout << "Real Quack" << '\n';
    }
};

class RubberDuck : public Duck
{
public:
    RubberDuck()
    {
        setRubber(true);
    }
};

class RealDuck : public Duck
{
public:
    RealDuck()
    {
        setRubber(false);
    }
};

template <typename T>
void processData(T *data)
{
    if constexpr (is_same<T, int>::value)
    {
        cout << *data << '\n';
    }
    else if constexpr (is_same<T, double>::value)
    {
        cout << *data << '\n';
    }
    else
    {
        cout << "Invalid Type" << '\n';
    }
}

int main()
{
    int i = 42;
    double d = 3.14;

    processData<int>(&i);
    processData<double>(&d);

    Duck *d1 = new RubberDuck();
    Duck *d2 = new RealDuck();
    RealDuck *rd;

    rd = dynamic_cast<RealDuck *>(d1);

    if (rd)
        rd->quack();
    else
        cout << "Casting Error" << '\n';

    return 0;
}
