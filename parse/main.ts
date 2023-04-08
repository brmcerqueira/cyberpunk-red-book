import { readLines } from "https://deno.land/std/io/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const fileReader = await Deno.open(path.join(Deno.cwd(), "/book.txt"));

let page = 0;

for await (const line of readLines(fileReader)) {
    const trimLine = line.trim();
    const value = Number(trimLine);

    if (trimLine !== "" 
    && !/\D/g.test(trimLine) 
    && !Number.isNaN(value) 
    && value > page 
    && (value - page) <= 5) {
        page = value;
        console.log("pagina: " + page);
    }
}