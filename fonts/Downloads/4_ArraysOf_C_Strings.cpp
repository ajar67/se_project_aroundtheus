// Arrays of C-strings

#include <iostream>
using std::cout;
using std::endl;

int main()
{
    char month[12][10] =
    { 
      "January",
      "February",
      "March",
      "April", 
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    };
    
    for (int index = 0; index < 12; index++)
        cout << month[index] << '\n';

    int len = 0;
    for (int index = 0; index < 12; index++)
        len += strlen(month[index]);

    cout << "The size of the array is " << sizeof(month) << endl;
    cout << "The total length of the strings is " 
        << len << endl;  //74
    
    // if we make an array of poiters pointed to month 
    // names, we need 74 bytes for the month names
    // plus 12 * 4 bytes for the array of pointers
    // A total of 122 bytes

    const char* mPtrs[12]{
       "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    };

    for (int index = 0; index < 12; index++)
        cout << mPtrs[index] << '\n';
    cout << endl;
    cout << "The size of the pointers array is "
        << sizeof(mPtrs) << endl;

    cout << "The total of C-strings and array of pointers is "
        << sizeof(mPtrs) + len << endl;

    // if poiters pointed to month names
    // we need 74 bytes for th emonth names
    // plus 12 * 4 bytes for the array of pointers
    // A total of 122 bytes

    return 0;
}


