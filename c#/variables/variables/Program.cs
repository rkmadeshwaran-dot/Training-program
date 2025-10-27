// See https://aka.ms/new-console-template for more information

class Vara 
{
    static void Main(String[] args)
    {
        int age = 24;
        string name = "Rahul";
        char lname = 'd';
        bool vaild = true;
        double cgpa = 8.5;


        Console.WriteLine($"Age is: {age}\nName is: {name}\nlast name is: {lname}\nvaild ?: {vaild}\ncgpa is: {cgpa}");

        int a = 20;
        int b = 10;

        Console.WriteLine("\n !! Arithmetic Operators !!\n");
        Console.WriteLine("Addition :- " + (a + b));
        Console.WriteLine("subtraction :- " + (a - b));
        Console.WriteLine("Muiltplication :- " + (a * b));
        Console.WriteLine("modulo :- " + (a / b));
        Console.WriteLine("division :- " + (a % b),"\n");

     

        Console.WriteLine("\n !!!---comparison operators---!!!\n");

        if(age >= 18 && vaild == true)
        {
            Console.WriteLine("you are eligible");
        }
        else if(age >= 18 && vaild == false)
        {
            Console.WriteLine("Sorry you are eligible");
        }
        else if (age <= 18 || cgpa != 9) 
        {
            Console.WriteLine("you are not eligible for voterId");
        }
    }
}
