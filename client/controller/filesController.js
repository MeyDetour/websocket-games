async function getFilesNamesInFolder(path) {
    try {
        const res = await fetch('http://localhost:3000/api/getfiles?path=' + encodeURIComponent(path));
        const files = await res.json();
        console.log("Fichiers disponibles :", files);
        return files;
    } catch (err) {
        console.error("Erreur fetch manuel :", err);
        return [];
    }
}
