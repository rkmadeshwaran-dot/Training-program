// See https://aka.ms/new-console-template for more information
using System;

public delegate int MathOperations(int a, int b);
class Program
{
    static int Add(int a, int b) => a + b;
    static int Sub(int a, int b) => a - b;
    static int Mul(int a, int b) => a * b;
    static int Div(int a, int b) => a / b;
    static void Main(string[] args)
    {
        MathOperations add = Add;
        MathOperations sub = Sub;
        MathOperations mul = Mul;
        MathOperations div = Div;

        int x = 5, y = 3;

        Console.WriteLine($"Add:{add(x,y)}");
        Console.WriteLine($"Sub:{sub(x,y)}");
        Console.WriteLine($"Mul:{mul(x,y)}");
        Console.WriteLine($"Div:{div(x,y)}");
    }
}