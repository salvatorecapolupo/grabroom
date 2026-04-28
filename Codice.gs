function extractDeepClassroomArchive() {
  const courseId = '.....'; // <--- ASSICURATI CHE SIA CORRETTO
  const folderName = '...';
  
  const destFolder = DriveApp.createFolder(folderName);
  console.log("Cartella creata: " + folderName);

  // --- 1. RECUPERA I COMPITI (COURSEWORK) ---
  let pageToken = null;
  do {
    const response = Classroom.Courses.CourseWork.list(courseId, {pageToken: pageToken});
    if (response.courseWork) {
      response.courseWork.forEach(work => {
        processMaterials(work.materials, work.creationTime, "COMPITO", work.title, destFolder);
      });
    }
    pageToken = response.nextPageToken;
  } while (pageToken);

  // --- 2. RECUPERA I MATERIALI (DISPENSE) ---
  pageToken = null;
  do {
    const response = Classroom.Courses.CourseWorkMaterials.list(courseId, {pageToken: pageToken});
    if (response.courseWorkMaterial) {
      response.courseWorkMaterial.forEach(mat => {
        processMaterials(mat.materials, mat.creationTime, "MATERIALE", mat.title, destFolder);
      });
    }
    pageToken = response.nextPageToken;
  } while (pageToken);

  // --- 3. RECUPERA GLI ANNUNCI (STREAM) ---
  pageToken = null;
  do {
    const response = Classroom.Courses.Announcements.list(courseId, {pageToken: pageToken});
    if (response.announcements) {
      response.announcements.forEach(ann => {
        const shortText = ann.text ? ann.text.substring(0, 30).replace(/[/\\?%*:|"<>]/g, '-') : "Senza_Titolo";
        processMaterials(ann.materials, ann.creationTime, "ANNUNCIO", shortText, destFolder);
      });
    }
    pageToken = response.nextPageToken;
  } while (pageToken);

  console.log("Scansione totale completata!");
}

function processMaterials(materials, dateRaw, typeLabel, postTitle, destFolder) {
  if (!materials) return;
  const pubDate = new Date(dateRaw);
  const formattedDate = Utilities.formatDate(pubDate, "GMT+1", "yyyyMMdd");
  const cleanPostTitle = postTitle.replace(/[/\\?%*:|"<>]/g, '-').trim();

  materials.forEach(material => {
    let driveFileId = null;
    if (material.driveFile) driveFileId = material.driveFile.driveFile.id;
    if (material.form) driveFileId = material.form.formId;

    if (driveFileId) {
      try {
        const originalFile = DriveApp.getFileById(driveFileId);
        const newName = `${formattedDate} - ${typeLabel} - ${cleanPostTitle} - ${originalFile.getName()}`;
        originalFile.makeCopy(newName, destFolder);
        console.log("Copiato: " + newName);
      } catch (e) {
        console.log("Saltato (permessi o link): " + driveFileId);
      }
    } else if (material.youtubeVideo) {
       // Opzionale: logga i video di YouTube se ti servono i titoli
       console.log("Video YouTube trovato: " + material.youtubeVideo.title);
    }
  });
}
