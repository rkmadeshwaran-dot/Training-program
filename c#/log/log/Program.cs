// See https://aka.ms/new-console-template for more information
using System;
using System.IO;

namespace LoggerExample
{
    public interface ILogger
    {
        void LogInfo(string message);
        void LogWarning(string message);
        void LogError(string message);
    }

    public class ConsoleLogger : ILogger
    {
        public void LogInfo(string message)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"[INFO] {message}");
            Console.ResetColor();
        }

        public void LogWarning(string message)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"[WARNING] {message}");
            Console.ResetColor();
        }

        public void LogError(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[ERROR] {message}");
            Console.ResetColor();
        }
    }

    public class FileLogger : ILogger
    {
        private readonly string filePath;

        public FileLogger(string path = "log.txt")
        {
            filePath = path;
        }

        public void LogInfo(string message)
        {
            LogToFile($"[INFO] {message}");
        }

        public void LogWarning(string message)
        {
            LogToFile($"[WARNING] {message}");
        }

        public void LogError(string message)
        {
            LogToFile($"[ERROR] {message}");
        }

        private void LogToFile(string message)
        {
            File.AppendAllText(filePath, $"{DateTime.Now}: {message}{Environment.NewLine}");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            ILogger logger;

            Console.WriteLine("Choose Logger Type:");
            Console.WriteLine("1 - Console Logger");
            Console.WriteLine("2 - File Logger");
            Console.Write("Enter your choice: ");
            string choice = Console.ReadLine();

            if (choice == "2")
            {
                logger = new FileLogger(); // Inject FileLogger
                Console.WriteLine("FileLogger selected. Logs will be written to log.txt.");
            }
            else
            {
                logger = new ConsoleLogger(); // Inject ConsoleLogger
                Console.WriteLine("ConsoleLogger selected. Logs will appear in the console.");
            }

            
            logger.LogInfo("Application started.");
            logger.LogWarning("This is a warning.");
            logger.LogError("An error occurred.");
        }
    }
}
