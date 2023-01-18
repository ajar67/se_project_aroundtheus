#define _CRT_SECURE_NO_WARNINGS 
#include <iostream>

using std::cout;
using std::endl;

#include <cstring>

int main()
{
   char x[] = "Happy Birthday to You";
   char y[ 25 ], z[ 45 ];

   cout << "The string in array x is: " << x
        << "\nThe string in array y is: " << strcpy( y, x )
        << '\n';
   strncpy( z, x, 14 );  // does not copy null character
   z[14 ] = '\0';
   cout << "The string in array z is: " << z << endl;
   
   int result1 = strcmp(x,y);
   int result2 = strcmp(z,x);
   int result3 = strcmp(x,z);
   cout << result1 << " " << result2 << " " << result3 << endl;
   result1 = strncmp(x, y, 10);
   result2 = strncmp(z, x, 10);
   result3 = strncmp(x, z, 10);
   cout << result1 << " " << result2 << " " << result3 << endl;

   strcat(z,x);
   cout << "After concatenation z is " << endl;
   cout << z << endl;
   
   cout << strcat(z, "!") << endl;
   // trim z to the original size
   z[14 ] = '\0';
   
   strncat (z, "      ", 1);
   cout << "After strncat z is " << endl;
   cout << z << "|" << endl;
   for (int i = 0; i < sizeof(z); i++)
	   cout << (int) z[i] << " ";
   cout << endl;

   return 0;
}

