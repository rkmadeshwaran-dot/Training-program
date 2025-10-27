// See https://aka.ms/new-console-template for more information
using System;
using System.Collections.Generic;

abstract class Shape
{
    public abstract double GetArea();
    public abstract double GetPerimeter();
}

class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public override double GetArea()
    {
        return Width * Height;
    }

    public override double GetPerimeter()
    {
        return 2 * (Width + Height);
    }
}

class Circle : Shape
{
    public double Radius { get; set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }

    public override double GetPerimeter()
    {
        return 2 * Math.PI * Radius;
    }
}

class Triangle : Shape
{
    public double A { get; set; }
    public double B { get; set; }
    public double C { get; set; }

    public Triangle(double a, double b, double c)
    {
        A = a;
        B = b;
        C = c;
    }

    // Using Heron’s formula
    public override double GetArea()
    {
        double s = (A + B + C) / 2;
        return Math.Sqrt(s * (s - A) * (s - B) * (s - C));
    }

    public override double GetPerimeter()
    {
        return A + B + C;
    }
}

class Program
{
    static void Main()
    {
        List<Shape> shapes = new List<Shape>()
        {
            new Rectangle(5, 3),
            new Circle(4),
            new Triangle(3, 4, 5)
        };

        double totalArea = 0;
        double totalPerimeter = 0;

        foreach (var shape in shapes)
        {
            totalArea += shape.GetArea();
            totalPerimeter += shape.GetPerimeter();
        }

        Console.WriteLine($"Total Area: {totalArea:F2}");
        Console.WriteLine($"Total Perimeter: {totalPerimeter:F2}");
    }
}



