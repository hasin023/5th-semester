#include <iostream>
#include <type_traits>
using namespace std;

template <typename T>
void func(T value) {
    if constexpr(is_same<T,int>::value)cout<<value<<'\n';
    else cout<<"Invalid Type"<<'\n';
}

int main() {
    
    int i = 10;
    double d = 25.98;
    
    func(i);
    func(d);
    
    return 0;
}