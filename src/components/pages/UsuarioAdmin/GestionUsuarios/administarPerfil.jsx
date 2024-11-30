// import React, { useState, useEffect } from "react";
// import "./administrarPerfil.css";
// import UsuarioNavbar from "../../../layouts/Navbar/UsuarioNavbar";
// import Footer from "../../../layouts/Footer";
// import { getUsuarioById, updateUsuario } from "../../../../services/usuarioService";
// import Button from "../../../atoms/Button";
// import { useUserContext } from "../../../../contexts/UserContext";

// const Perfil = () => {
//   const { userId } = useUserContext();
//   const [usuario, setUsuario] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [fotoPerfil, setFotoPerfil] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsuario = async () => {
//       try {
//         const data = await getUsuarioById(userId);
//         setUsuario(data);
//         setFormData(data);
//         setFotoPerfil(data.fotoPerfil || "");
//       } catch (error) {
//         console.error("Error al cargar el perfil:", error);
//       }
//     };
//     fetchUsuario();
//   }, [userId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleEditMode = () => {
//     setEditMode(!editMode);
//   };

//   const openUploadWidget = () => {
//     window.cloudinary.openUploadWidget(
//       {
//         cloudName: "dekwvhxog",
//         uploadPreset: "preset_NexTek",
//         sources: ["local", "url", "camera"],
//         multiple: false,
//         cropping: true,
//         croppingAspectRatio: 1,
//         resourceType: "image",
//         maxImageFileSize: 2000000, // Limitar a 2MB
//       },
//       (error, result) => {
//         if (!error && result?.event === "success") {
//           const imageUrl = result.info.secure_url;
//           setFotoPerfil(imageUrl);
//           setFormData((prev) => ({ ...prev, fotoPerfil: imageUrl }));
//         } else if (error) {
//           console.error("Error al subir la imagen:", error);
//         }
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     try {
//       const updatedData = {
//         idUsuario: usuario.idUsuario,
//         nombre: formData.nombre,
//         apellido1: formData.apellido1,
//         apellido2: formData.apellido2,
//         email: formData.email,
//         telefono: formData.telefono,
//         fechaNacimiento: formData.fechaNacimiento,
//         fotoPerfil: fotoPerfil || usuario.fotoPerfil,
//         estado: usuario.estado, // Mantener el estado actual
//       };

//       await updateUsuario(usuario.idUsuario, updatedData);
//       setUsuario(updatedData);
//       setEditMode(false);
//       alert("Perfil actualizado exitosamente");
//     } catch (error) {
//       console.error("Error al guardar el perfil:", error);
//       alert("Hubo un error al actualizar el perfil");
//     }
//   };

//   return (
//     <div className="pagina-perfil">
//       <header>
//         <UsuarioNavbar />
//       </header>
//       <main>
//         <h1>Mi Perfil</h1>
//         <div className="perfil-container">
//           <div className="foto-container">
//             <img
//               src={fotoPerfil || "/placeholder-profile.png"}
//               alt="Foto de perfil"
//               className="foto-perfil"
//             />
//             {editMode && (
//               <Button
//                 text="Subir Foto"
//                 onClick={openUploadWidget}
//                 variant="secondary"
//                 size="medium"
//                 disabled={loading}
//               />
//             )}
//           </div>
//           <div className="informacion-perfil">
//             <div className="campo">
//               <label>Cédula</label>
//               <input
//                 type="text"
//                 value={usuario.cedula || ""}
//                 readOnly
//                 disabled
//               />
//             </div>
//             <div className="campo">
//               <label>Nombre</label>
//               <input
//                 type="text"
//                 name="nombre"
//                 value={formData.nombre || ""}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//               />
//             </div>
//             <div className="campo">
//               <label>Primer Apellido</label>
//               <input
//                 type="text"
//                 name="apellido1"
//                 value={formData.apellido1 || ""}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//               />
//             </div>
//             <div className="campo">
//               <label>Segundo Apellido</label>
//               <input
//                 type="text"
//                 name="apellido2"
//                 value={formData.apellido2 || ""}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//               />
//             </div>
//             <div className="campo">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email || ""}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//               />
//             </div>
//             <div className="campo">
//               <label>Teléfono</label>
//               <input
//                 type="text"
//                 name="telefono"
//                 value={formData.telefono || ""}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//               />
//             </div>
//             <div className="campo">
//               <label>Fecha de Nacimiento</label>
//               <input
//                 type="date"
//                 name="fechaNacimiento"
//                 value={formData.fechaNacimiento || ""}
//                 onChange={handleInputChange}
//                 readOnly={!editMode}
//               />
//             </div>
//           </div>
//           <div className="acciones">
//             <Button
//               text={editMode ? "Guardar Cambios" : "Editar Perfil"}
//               onClick={editMode ? handleSubmit : toggleEditMode}
//               variant="primary"
//               size="medium"
//             />
//             {editMode && (
//               <Button
//                 text="Cancelar"
//                 onClick={toggleEditMode}
//                 variant="secondary"
//                 size="medium"
//               />
//             )}
//           </div>
//         </div>
//       </main>
//       <footer>
//         <Footer />
//       </footer>
//     </div>
//   );
// };

// export default Perfil;


import React, { useState, useEffect } from "react";
import "./administrarPerfil.css";
import UsuarioNavbar from "../../../layouts/Navbar/UsuarioNavbar";
import Footer from "../../../layouts/Footer";
import { getUsuarioById, updateUsuario } from "../../../../services/usuarioService";
import { uploadImageToCloudinary } from "../../../../services/cloudinaryService";
import Button from "../../../atoms/Button";
import { useUserContext } from "../../../../contexts/UserContext";
import { formatFechaNacimiento } from "../../../../utils/dateUtils";
import { sendEmail } from "../../../../services/authService";

const Perfil = () => {
  const { userId } = useUserContext();
  const [usuario, setUsuario] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await getUsuarioById(userId);
        setUsuario(data);
        setFormData(data);
        setFotoPerfil(data.fotoPerfil || "");
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };
    fetchUsuario();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setFotoPerfil(imageUrl);
        setFormData((prev) => ({ ...prev, fotoPerfil: imageUrl }));
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        idUsuario: usuario.idUsuario,
        cedula: usuario.cedula,
        nombre: formData.nombre,
        apellido1: formData.apellido1,
        apellido2: formData.apellido2,
        email: formData.email,
        telefono: formData.telefono,
        fechaNacimiento: formatFechaNacimiento(formData.fechaNacimiento),
        fotoPerfil: fotoPerfil || usuario.fotoPerfil,
        estado: usuario.estado, // Mantener el estado actual
      };

      await updateUsuario(usuario.idUsuario, updatedData);
      setUsuario(updatedData);
      setEditMode(false);
      const emailMessage = `
      Estimado/a ${formData.nombre} ${formData.apellido1} ${formData.apellido2},
      
      Su perfil ha sido actualizado correctamente con la siguiente información:
      - Nombre: ${formData.nombre}
      - Apellido 1: ${formData.apellido1}
      - Apellido 2: ${formData.apellido2}
      - Cédula: ${usuario.cedula}
      - Teléfono: ${formData.telefono}
      - Fecha de Nacimiento: ${formatFechaNacimiento(formData.fechaNacimiento)}
      - Estado: ${usuario.estado}
      
      Si no solicitó esta actualización, por favor póngase en contacto con el soporte.
      
      Atentamente,
      Equipo de Soporte
    `;

    await sendEmail(formData.email, emailMessage);
      alert("Perfil actualizado y correo enviado exitosamente a " + formData.email);
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      alert("Hubo un error al actualizar el perfil");
    }
  };

  return (
    <div className="pagina-perfil">
      <header>
        <UsuarioNavbar />
      </header>
      <main>
        <h1>Mi Perfil</h1>
        <div className="perfil-container">
          <div className="foto-container">
            <img
              src={fotoPerfil || "https://res.cloudinary.com/dekwvhxog/image/upload/user_iiwdqq"}
              alt="Foto de perfil"
              className="foto-perfil"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input-foto"
                disabled={loading}
              />
            )}
          </div>
          <div className="informacion-perfil">
            <form>
              <div className="campo">
                <label>Cédula</label>
                <input
                  type="text"
                  value={usuario.cedula || ""}
                  readOnly
                  disabled
                />
              </div>
              <div className="campo">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ""}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="campo">
                <label>Primer Apellido</label>
                <input
                  type="text"
                  name="apellido1"
                  value={formData.apellido1 || ""}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="campo">
                <label>Segundo Apellido</label>
                <input
                  type="text"
                  name="apellido2"
                  value={formData.apellido2 || ""}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="campo">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="campo">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono || ""}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
              <div className="campo">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento || ""}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
              </div>
            </form>
          </div>
          <div className="acciones">
            <Button
              text={editMode ? "Guardar Cambios" : "Editar Perfil"}
              onClick={editMode ? handleSubmit : toggleEditMode}
              variant="primary"
              size="medium"
            />
            {editMode && (
              <Button
                text="Cancelar"
                onClick={toggleEditMode}
                variant="secondary"
                size="medium"
              />
            )}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Perfil;
