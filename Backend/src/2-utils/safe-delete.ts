import fsPromises from "fs/promises";
import fs from "fs";

async function safeDelete(fileName: string): Promise<void> {
    try {
        if (!fileName) return;
        if (fs.existsSync(fileName)) {
            // Check if file exist
            await fsPromises.unlink(fileName); // Delete the file
        }
    } catch (err: any) {
        console.log(err.message);
    }
}

export default safeDelete;