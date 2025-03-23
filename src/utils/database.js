import { db } from "./firebase";
import { collection, addDoc, getDocs,deleteDoc, serverTimestamp, doc  } from "firebase/firestore";

// Função para adicionar um novo item
export const adicionarFonte = async (descricao, cnpj) => {
  try {
    await addDoc(collection(db, "fontes"), { descricao, cnpj, dataHora: serverTimestamp() });
    console.log("Fonte adicionada com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar fonte: ", error);
  }
};

// Função para buscar as fontes do banco
export const buscarFontes = async () => {
    const querySnapshot = await getDocs(collection(db, "fontes"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,  // 🔥 Pegando o ID gerado pelo Firestore
      ...doc.data() // Incluindo os outros dados do documento
    }));
  };

//funcar para remover fonte do banco
export const removerFonteDoBanco = async (id) => {
    try {
        await deleteDoc(doc(collection(db, "fontes"), id)); // Remove do Firestore
        console.log("Fonte removida com sucesso!");
    } catch (error) {
        console.error("Erro ao remover fonte:", error);
    }
};
