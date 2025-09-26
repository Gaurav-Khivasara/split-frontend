// import java.io.File;
// import java.io.FileWriter;

// public class Del {
//   public static void main(String[] args) {
//     try {
//       String[] s = { "15", "M", "26", "L", "20", "CDHNRU", "23", "Z", "11", "W", "18", "GOQ", "24", "FT", "22",
//           "ABEKPSVXY", "30", "J", "38", "I" };
//       for (int i = 0; i < s.length - 1; i += 2) {
//         for (int j = 0; j < s[i + 1].length(); j++) {
//           File file = new File(s[i + 1].toLowerCase().charAt(j) + "-checked.svg");
//           file.createNewFile();
//           FileWriter out = new FileWriter(file);
//           out.write(
//               "<svg width=\"400px\" height=\"400px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"100\" height=\"100\" fill=\"#007BFF\"/>\n<text x=\""
//                   + s[i] + "%\" y=\"80%\" font-size=\"20\" fill=\"white\" font-family=\"Arial\">" + s[i + 1].charAt(j)
//                   + "</text>\n<path opacity=\"75%\" fill=\"#000000\" d=\"M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z\"/>\n</svg>\n");
//           out.close();
//         }
//       }
//     } catch (Exception e) {
//       System.out.println("An error occurred.");
//       e.printStackTrace();
//     }
//   }
// }

// import java.io.File;
// import java.io.FileWriter;
// import java.util.HashMap;
// import java.util.Map;

// public class Del {
//   public static void main(String[] args) {
//     try {
//       // Your original data
//       String[] s = {
//           "15", "M",
//           "26", "L",
//           "20", "CDHNRU",
//           "23", "Z",
//           "11", "W",
//           "18", "GOQ",
//           "24", "FT",
//           "22", "ABEKPSVXY",
//           "30", "J",
//           "38", "I"
//       };

//       // Map letters to colors (from your JSON)
//       Map<Character, String> colorMap = new HashMap<>();
//       colorMap.put('a', "#2B5347");
//       colorMap.put('b', "#E74C3C");
//       colorMap.put('c', "#3F7365");
//       colorMap.put('d', "#D35400");
//       colorMap.put('e', "#599D8C");
//       colorMap.put('f', "#C0392B");
//       colorMap.put('g', "#7B4397");
//       colorMap.put('h', "#FF6F61");
//       colorMap.put('i', "#27AE60");
//       colorMap.put('j', "#9B59B6");
//       colorMap.put('k', "#4B4A67");
//       colorMap.put('l', "#34495E");
//       colorMap.put('m', "#E58E00");
//       colorMap.put('n', "#263B45");
//       colorMap.put('o', "#F5A623");
//       colorMap.put('p', "#6D6A75");
//       colorMap.put('q', "#16A085");
//       colorMap.put('r', "#3DAF54");
//       colorMap.put('s', "#2A5CA9");
//       colorMap.put('t', "#9A8F7F");
//       colorMap.put('u', "#1F3F7A");
//       colorMap.put('v', "#D64550");
//       colorMap.put('w', "#55707A");
//       colorMap.put('x', "#357ABD");
//       colorMap.put('y', "#2D2B44");
//       colorMap.put('z', "#E74C3C");

//       for (int i = 0; i < s.length - 1; i += 2) {
//         String percentX = s[i];
//         String letters = s[i + 1];

//         for (int j = 0; j < letters.length(); j++) {
//           char letter = letters.charAt(j);
//           String color = colorMap.get(Character.toLowerCase(letter));
//           if (color == null) {
//             // fallback color if letter not found
//             color = "white";
//           }

//           File file = new File(Character.toLowerCase(letter) + ".svg");
//           file.createNewFile();

//           FileWriter out = new FileWriter(file);
//           out.write(
//               "<svg width=\"400px\" height=\"400px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
//                   "<rect width=\"100\" height=\"100\" fill=\"" + color + "\"/>\n" +
//                   "<text x=\"" + percentX + "%\" y=\"80%\" font-size=\"20\" fill=\"#FFFFFF\" font-family=\"Arial\">"
//                   + letter + "</text>\n" +
//                   "<path opacity=\"75%\" fill=\"#000000\" d=\"M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z\"/>\n"
//                   + "</svg>\n");
//           out.close();
//         }
//       }
//       System.out.println("SVG files generated with correct text colors.");
//     } catch (Exception e) {
//       System.out.println("An error occurred.");
//       e.printStackTrace();
//     }
//   }
// }

import java.io.File;
import java.io.FileWriter;

import java.util.Scanner;

public class Del {
  public static void main(String[] args) {
    String[] colors = {
        "#D32F2F", // Crimson Red
        "#F4511E", // Fire Orange
        "#FF8F00", // Deep Amber
        "#689F38", // Lime Green
        "#2E7D32", // Forest Green
        "#00796B", // Teal
        "#0097A7", // Cyan
        "#0288D1", // Sky Blue
        "#303F9F", // Indigo
        "#7B1FA2", // Purple
        "#C2185B", // Deep Pink
        "#D81B60", // Magenta
        "#4A148C", // Maroon
        "#5D4037", // Dark Brown
        "#827717", // Olive
        "#00695C", // Dark Cyan
        "#1565C0", // Royal Blue
        "#6A1B9A", // Violet
        "#EF6C00", // Dark Orange
        "#B71C1C", // Crimson Red (Darker)
        "#388E3C", // Emerald Green
        "#455A64", // Blue Gray
        "#283593", // Dark Slate Blue
        "#AD1457", // Raspberry
        "#BF360C", // Bronze
        "#880E4F" // Dark Magenta
    };

    try {
      for (int i = 0; i < 26; i++) {
        File svgFile = new File(
            "C:\\Users\\HP\\Desktop\\2nd Odd Sem--\\MSWD--\\HTML--\\Split--\\frontend\\public\\default-profile-pics\\unchecked\\"
                + (char) ('a' + i) + ".svg");
        Scanner sc = new Scanner(svgFile);
        String svg = sc.nextLine();
        sc.close();
        int idx = svg.indexOf("style");
        int j = svg.indexOf((">"));
        FileWriter fw = new FileWriter(svgFile);
        fw.write(svg.substring(0, idx - 1) + svg.substring(j));
        fw.flush();
        fw.close();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}