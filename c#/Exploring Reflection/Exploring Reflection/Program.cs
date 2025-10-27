// See https://aka.ms/new-console-template for more information
using System;
using System.Reflection;

class ObjectSerializer
{
    public static string SerializeObject(object obj)
    {
        Type type = obj.GetType();
        PropertyInfo[] properties = type.GetProperties();

        string result = $"{type.Name} Properties:\n";

        foreach (var prop in properties)
        {
            object value = prop.GetValue(obj);
            result += $"{prop.Name}: {value}\n";
        }

        return result;
    }
}
class Person
{
    public required string Name { get; set; }
    public int Age { get; set; }
}

class Product
{
    public required string ProductName { get; set; }
    public double Price { get; set; }
}

class Program
{
    static void Main()
    {
        Person person = new Person { Name = "John", Age = 28 };
        Product product = new Product { ProductName = "Laptop", Price = 75000.50 };

        Console.WriteLine(ObjectSerializer.SerializeObject(person));
        Console.WriteLine(ObjectSerializer.SerializeObject(product));
    }
}

