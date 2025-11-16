using System.Diagnostics;
using System.Text; 

namespace Algoritmus
{
    internal class Program
    {
        static Random rnd = new Random();
        static int[] hossz = new int[] {10,100,500,1000,10000,50000};
        static string[] fajlNevek = new string[] {"Egyszeru","Bubble","Quick","Insertion","Radix"};
        static Stopwatch stw = new Stopwatch();

        static double[] SortEgyszeru(int[] tomb, List<int> lista)
        {
            double[] meresek = new double[2];

            stw.Start();
            for (int i = 0; i < tomb.Length - 1; i++)
            {
                for (int j = i + 1; j < tomb.Length; j++)
                {
                    if (tomb[i] > tomb[j])
                    {
                        int seged = tomb[i];
                        tomb[i] = tomb[j];
                        tomb[j] = seged;
                    }
                }
            }
            stw.Stop();
            meresek[0] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            stw.Start();
            for (int i = 0; i < lista.Count - 1; i++)
            {
                for (int j = i + 1; j < lista.Count; j++)
                {
                    if (lista[i] > lista[j])
                    {
                        int seged = lista[i];
                        lista[i] = lista[j];
                        lista[j] = seged;
                    }
                }
            }
            stw.Stop();
            meresek[1] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            return meresek;
        }

        static double[] SortBubble(int[] tomb, List<int> lista)
        {
            double[] meresek = new double[2];

            stw.Start();
            for (int i = tomb.Length - 1; i > 0; i--)
            {
                for (int j = 0; j < i; j++)
                {
                    if (tomb[j] > tomb[j + 1])
                    {
                        int tmp = tomb[j + 1];
                        tomb[j + 1] = tomb[j];
                        tomb[j] = tmp;
                    }
                }
            }
            stw.Stop();
            meresek[0] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            stw.Start();
            for (int i = lista.Count - 1; i > 0; i--)
            {
                for (int j = 0; j < i; j++)
                {
                    if (lista[j] > lista[j + 1])
                    {
                        int tmp = lista[j + 1];
                        lista[j + 1] = lista[j];
                        lista[j] = tmp;
                    }
                }
            }
            stw.Stop();
            meresek[1] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();
            return meresek;
        }

        static void SortQuick_Array(int also, int felso, int[] tomb)
        {
            int i = also, j = felso;
            int kozep = tomb[(felso + also) / 2];
            while (also <= felso)
            {
                while (also < j && tomb[also] < kozep)
                    also++;
                while (felso > i && tomb[felso] > kozep)
                    felso--;
                if (also <= felso)
                {
                    int tmp = tomb[also];
                    tomb[also] = tomb[felso];
                    tomb[felso] = tmp;
                    ++also;
                    --felso;
                }
            }
            if (also < j) SortQuick_Array(also, j, tomb);
            if (i < felso) SortQuick_Array(i, felso, tomb);
        }

        static void SortQuick_List(int also, int felso, List<int> lista)
        {
            int i = also, j = felso;
            int kozep = lista[(felso + also) / 2];
            while (also <= felso)
            {
                while (also < j && lista[also] < kozep)
                    also++;
                while (felso > i && lista[felso] > kozep)
                    felso--;
                if (also <= felso)
                {
                    int tmp = lista[also];
                    lista[also] = lista[felso];
                    lista[felso] = tmp;
                    ++also;
                    --felso;
                }
            }
            if (also < j) SortQuick_List(also, j, lista);
            if (i < felso) SortQuick_List(i, felso, lista);
        }

        static double[] SortQuick(int[] tomb, List<int> lista)
        {
            double[] meresek = new double[2];

            stw.Start();
            SortQuick_Array(0, tomb.Length - 1, tomb);
            stw.Stop();
            meresek[0] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            stw.Start();
            SortQuick_List(0, lista.Count - 1, lista);
            stw.Stop();
            meresek[1] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            return meresek;

        }

        static double[] SortInsertion(int[] tomb, List<int> lista)
        {
            double[] meresek = new double[2];

            stw.Start();
            for (int i = 1; i < tomb.Length; i++)
            {
                int tmp = tomb[i];
                int j = i - 1;

                while (j >= 0 && tomb[j] > tmp)
                {
                    tomb[j + 1] = tomb[j];
                    j--;
                }
                tomb[j + 1] = tmp;
            }
            stw.Stop();
            meresek[0] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            stw.Start();
            for (int i = 1; i < lista.Count; i++)
            {
                int tmp = lista[i];
                int j = i - 1;

                while (j >= 0 && lista[j] > tmp)
                {
                    lista[j + 1] = lista[j];
                    j--;
                }
                lista[j + 1] = tmp;
            }
            stw.Stop();
            meresek[1] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();
            return meresek;
        }

        static void SortRadix_Array(int[] tomb)
        {
            int n = tomb.Length;

            int[] zeros = new int[n];
            int[] ones = new int[n];
            for (int bit = 0; bit < 32; bit++)
            {
                int zeroCount = 0;
                int oneCount = 0;
                for (int i = 0; i < n; i++)
                {
                    int bitValue = (tomb[i] >> bit) & 1;

                    if (bitValue == 0)
                    {
                        zeros[zeroCount] = tomb[i];
                        zeroCount++;
                    }
                    else
                    {
                        ones[oneCount] = tomb[i];
                        oneCount++;
                    }
                }
                int index = 0;
                for (int i = 0; i < zeroCount; i++)
                    tomb[index++] = zeros[i];

                for (int i = 0; i < oneCount; i++)
                    tomb[index++] = ones[i];
            }
        }

        static void SortRadix_List(List<int> lista)
        {
            for (int bit = 0; bit < 32; bit++)
            {
                List<int> zeros = new List<int>();
                List<int> ones = new List<int>();

                foreach (int num in lista)
                {
                    int bitValue = (num >> bit) & 1;

                    if (bitValue == 0)
                        zeros.Add(num);
                    else
                        ones.Add(num);
                }
                int index = 0;

                foreach (int num in zeros)
                    lista[index++] = num;

                foreach (int num in ones)
                    lista[index++] = num;
            }
        }

        static double[] SortRadix(int[] tomb, List<int> lista)
        {
            double[] meresek = new double[2];

            stw.Start();
            SortRadix_Array(tomb);
            stw.Stop();
            meresek[0] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            stw.Start();
            SortRadix_List(lista);
            stw.Stop();
            meresek[1] = stw.Elapsed.TotalMilliseconds;
            stw.Reset();

            return meresek;
        }

        static int[] TombFeltoltes(int n)
        {
            int[] tomb = new int[n];
            for (int i = 0; i < n; i++)
            {
                tomb[i] = rnd.Next(0, 100001);
            }
            return tomb;
        }

        static List<int> Listafeltoltes(int n)
        {
            List<int> lista = new List<int>();
            for (int i = 0; i < n; i++)
            {
                lista.Add(rnd.Next(0, 100001));
            }
            return lista;
        }

        static void FileTorles()
        {
            for (int i = 0; i < fajlNevek.Length; i++)
            {
            string path = fajlNevek[i].ToLower() +".csv";
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            }
        }

        static void FileIras(bool boolean, string fajlNev, double[] meresek, int index)
        {
            StreamWriter sw = new StreamWriter(fajlNev + ".csv", true, Encoding.UTF8);
            if (boolean == true)
            {
                sw.WriteLine("Lista elemek száma;Lista mérésének ideje(ms);Tömb elemek száma;Tömb mérésének ideje(ms)");
            }
            else 
            {
                sw.WriteLine($"{hossz[index]};{meresek[1]};{hossz[index]};{meresek[0]}");
            }
            sw.Close();
        }



        static void Main(string[] args)
        {
            FileTorles();
            bool boolean = true;
            for (int i = 0; i < hossz.Length; i++)
            {
                int fajlIndex = 0;
                int[] tomb;
                List<int> lista;
                tomb = TombFeltoltes(hossz[i]);
                lista = Listafeltoltes(hossz[i]);

                //Egyszerű rendezés
                FileIras(boolean, fajlNevek[fajlIndex].ToLower(), SortEgyszeru(tomb, lista), i);
                fajlIndex++;

                //Buborékos rendezés
                FileIras(boolean, fajlNevek[fajlIndex].ToLower(), SortBubble(tomb, lista), i);
                fajlIndex++;

                //Gyors rendezés
                FileIras(boolean, fajlNevek[fajlIndex].ToLower(), SortQuick(tomb, lista), i);
                fajlIndex++;

                //Beillesztéses rendezés
                FileIras(boolean, fajlNevek[fajlIndex].ToLower(), SortInsertion(tomb, lista), i);
                fajlIndex++;

                //Radix rendezés
                FileIras(boolean, fajlNevek[fajlIndex].ToLower(), SortRadix(tomb, lista), i);
                boolean = false;
            }   
        }
    }
}
