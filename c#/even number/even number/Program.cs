// See https://aka.ms/new-console-template for more information
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {

        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        var evenNumbers = numbers.Where(n => n % 2 == 0).ToList();

        Console.WriteLine("Even numbers:");
        foreach (var num in evenNumbers)
        {
            Console.WriteLine(num);
        }
    }
}

