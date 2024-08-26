import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import Files from "../assets/file.png";

function Document({ name, element, setElement }) {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("Aucun fichier selectionné");
    const handle = (event) => {
        // Logique de l'enfant
        const { files } = event.target;
        console.log(files)
    
        // Mettez ici le code de votre onChange d'origine
        // files[0] && setFileName(files[0].name);
        files[0] && setElement({ ...element, content: files[0] });
        if (files) {
          setImage(Files)
          // console.log(image)
        }
    
        // Vous pouvez appeler la fonction onChange du parent ici
        // handleChange && handleChange(event);
    
        // Ajoutez votre propre logique ici si nécessaire
      };
  return (
    <div
      className="image__wrapper u-margin-top-small"
      onClick={() => document.querySelector(".input-document").click()}
    >
       <input
        name={name}
        type="file"
        className="input-document"
        accept=".pdf,.epub"
        hidden
        onChange={handle}
      />
            {image ? (
        <img
          className="image__wrapper--image"
          src={Files}
          width={150}
          height={150}
          alt={fileName}
          style={{objectFit:"cover"}}
        />
      ) : (
        <MdCloudUpload color="#1475cf" size={60} />
      )}
    </div>
  )
}

export default Document
