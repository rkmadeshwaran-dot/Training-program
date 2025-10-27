// See https://aka.ms/new-console-template for more information
using System;

class Program
{
    static void Main(string[] args)
    {
        int a, b, res;

        try
        {
            Console.WriteLine("enter number:");
            a = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("enter a number 2");
            b = Convert.ToInt32(Console.ReadLine());

            res = a / b;

            Console.WriteLine("answer :" + res);
        }

        catch (Exception e)
        {
            Console.WriteLine("Check your Number");
        }
    }
}
