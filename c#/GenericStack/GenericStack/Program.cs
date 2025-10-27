// See https://aka.ms/new-console-template for more information
using System;
using System.Collections.Generic;

public class Stack<T>
{
    private List<T> elements = new List<T>();

    public void Push(T item)
    {
        elements.Add(item);
    }

    public T Pop()
    {
        if (elements.Count == 0)
            throw new InvalidOperationException("Stack is empty!");

        T item = elements[elements.Count - 1];
        elements.RemoveAt(elements.Count - 1);
        return item;
    }

    public T Peek()
    {
        if (elements.Count == 0)
            throw new InvalidOperationException("Stack is empty!");

        return elements[elements.Count - 1];
    }
    public bool IsEmpty()
    {
        return elements.Count == 0;
    }
}

class Program
{
    static void Main()
    {
        Stack<int> intStack = new Stack<int>();
        intStack.Push(10);
        intStack.Push(20);
        intStack.Push(30);

        Console.WriteLine("Top of int stack: " + intStack.Peek());
        Console.WriteLine("Popped: " + intStack.Pop());
        Console.WriteLine("Top after pop: " + intStack.Peek());

        Console.WriteLine();

        Stack<string> stringStack = new Stack<string>();
        stringStack.Push("Alice");
        stringStack.Push("Bob");
        stringStack.Push("Charlie");

        Console.WriteLine("Top of string stack: " + stringStack.Peek());
        Console.WriteLine("Popped: " + stringStack.Pop());
        Console.WriteLine("Top after pop: " + stringStack.Peek());
    }
}

