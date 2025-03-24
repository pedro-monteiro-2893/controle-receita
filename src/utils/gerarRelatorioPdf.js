import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Importando a função corretamente

export const gerarRelatorioPDF = (receitasPorFonte) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");

    // Título do relatório
    doc.setFontSize(16);
    doc.text("Relatório de Receitas", 14, 15);
    doc.setFontSize(12);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 25);

    // Criando a tabela
    const colunas = ["Fonte", "CNPJ", "Total Recebido (R$)", "Previsão IR (R$)"];
    const linhas = Object.values(receitasPorFonte).map((item) => [
        item.nome,
        item.cnpj,
        item.total.toFixed(2),
        (item.total * 0.15).toFixed(2),
    ]);

    // 🔹 Calculando os totais
    const totalRecebido = Object.values(receitasPorFonte).reduce((acc, item) => acc + item.total, 0);
    const totalPrevisaoIR = totalRecebido * 0.15;

    // 🔹 Adicionando linha de totais
    linhas.push([
        "Total",
        "-",
        `R$ ${totalRecebido.toFixed(2)}`,
        `R$ ${totalPrevisaoIR.toFixed(2)}`
    ]);
    

    // Adicionando a tabela ao PDF
    autoTable(doc, {  // ✅ Use autoTable corretamente
        startY: 35,
        head: [colunas],
        body: linhas,
        theme: "grid",
        headStyles: { fillColor: [52, 152, 219] }, // Azul
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 2: { halign: "right" }, 3: { halign: "right" } },
    });

    // Salvar o PDF
    doc.save("Relatorio_Receitas.pdf");
};
