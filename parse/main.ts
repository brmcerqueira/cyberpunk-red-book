import { readLines } from "https://deno.land/std/io/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const fileReader = await Deno.open(path.join(Deno.cwd(), "/book.txt"));

let page = 0;

let dic: { [i:number]: number } = {};

for await (const line of readLines(fileReader)) {
    const trimLine = line.trim();
    const value = Number(trimLine);

    if (trimLine !== "" 
    && !/\D/g.test(trimLine) 
    && !Number.isNaN(value) 
    && value > page 
    && (value - page) <= 5) {
        page = value;
        const data = max(dic);
        console.log("%cpagina: " + page + " | data: " + data.index + " -> " + data.value, "color: red; font-weight: bold");
        dic = {};
    }
    else {
        for (let i = line.length; i >= 0; i--) {
            const ch = line.charAt(i);
            const key = i + 1;
            if (ch == ' ') {
                if (dic[key] != undefined) {
                    dic[key] = dic[key] + 1; 
                }
                else {
                    dic[key] = 1; 
                }      
            }     
        }

        console.log(line);
    }
}

function max(dic: { [i:number]: number }): { index: number, value: number } {
    const result: { index: number, value: number } = { index: -1, value: 0 };
    for (const key in dic) {
        if (dic[key] >= result.value) {
            result.index = Number(key);
            result.value = dic[key];
        }
    }
    return result;
}