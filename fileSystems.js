import fs from "fs";

//Reading data from File

//readFile
//readFileSync

//readFile

fs.readFile("readfile.txt","utf-8",(err,filedata)=>{
   if(filedata)
   {
    console.log("Data read from the file readFIle.txt is",filedata);
   }
   else{
    console.log("file error",err);
   }
});

//readFileSync

try {
    const fileData=fs.readFileSync("readfile.txt","utf-8");
    console.log("reading data using readFileSync:~",fileData);
} catch (error) {
    console.log("readFileSyncError",error)
}

//Write file mechanisms

//WriteFile
//WriteFIleSync

fs.writeFile("writeFile.txt","Hello this is added from server","utf-8",(err)=>{
   if(err)
   {
    console.log("Error in file creation/writing the file",err);
   }
   else{
    console.log("Data Written to the file");
   }
})

fs.writeFileSync("writeFileSync.txt","This is written using Write filesync","utf-8");
console.log("File created using Write file sync");

//updating the contents of the file
//appendFile();

fs.appendFile("writeFile.txt","\nNewly added by appendFile func","utf-8",(err,data)=>{
  if(err)
  {
    console.log("file updation failed!");
  }else{
    console.log("file updated successfully!");
  }
});

