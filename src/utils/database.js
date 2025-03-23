import { db } from "./firebase";
import { collection, addDoc, getDocs,deleteDoc, serverTimestamp, doc, updateDoc  } from "firebase/firestore";


// Função para adicionar um novo item
export const adicionarFonte = async (nome, descricao, cnpj) => {
  try {
    await addDoc(collection(db, "fontes"), { nome, descricao, cnpj, dataHora: serverTimestamp() });
    console.log("Fonte adicionada com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar fonte: ", error);
  }
};

export const adicionarReceita = async (idFonte, nome, valor, mes, ano) => {
    try {
      await addDoc(collection(db, "receitas"), { idFonte, nome, valor, mes, ano,dataHora: serverTimestamp() });
      console.log("Receita adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar receita: ", error);
    }
  };

//Consultas *********************************************************************************
//*******************************************************************************************
// Função para buscar as fontes do banco
export const buscarFontes = async () => {
    const querySnapshot = await getDocs(collection(db, "fontes"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,  // 🔥 Pegando o ID gerado pelo Firestore
      ...doc.data() // Incluindo os outros dados do documento
    }));
  };

// Função para buscar as receitas do banco
export const buscarReceitas = async () => {
    const querySnapshot = await getDocs(collection(db, "receitas"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,  // 🔥 Pegando o ID gerado pelo Firestore
      ...doc.data() // Incluindo os outros dados do documento
    }));
  };

// **********************************************************************************************
// **********************************************************************************************

//funcar para remover fonte do banco
export const removerFonteDoBanco = async (id) => {
    try {
        await deleteDoc(doc(collection(db, "fontes"), id)); // Remove do Firestore
    } catch (error) {
        console.log("Erro ao deletar fonte do banco");
    }
};

//funcar para remover receita do banco
export const removerReceitaDoBanco = async (id) => {
    try {
        await deleteDoc(doc(collection(db, "receitas"), id)); // Remove do Firestore
    } catch (error) {
        console.log("Erro ao deletar receita do banco");
    }
};

//Funcao para editar fonte no banco
export const editarFonte = async (id, novosDados) => {
    try {
      const fonteRef = doc(collection(db, "fontes"), id);
      await updateDoc(fonteRef, { 
        ...novosDados, 
        dataHoraAtualizacao: serverTimestamp() // Mantém um registro da última edição
      });
  
      console.log("Fonte editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar fonte:", error);
    }
  };
