import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MakeToPDF = async () => {

  // html to imageFile
  const paper: any = document.querySelector(".pdfDocArea");
  const canvas: any = await html2canvas(paper);
  const imageFile = canvas.toDataURL("image/png", 6.0);
  
  const doc = new jsPDF("p", "mm", "a4")
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const widthRatio = pageWidth / canvas.width;
  const customHeight = canvas.height * widthRatio;

  doc.addImage(imageFile, 'png', 0, 0, pageWidth, customHeight);
  let heightLeft = customHeight;
  let heightAdd = -pageHeight;

  while (heightLeft >= pageHeight) {
    doc.addPage()
    doc.addImage(imageFile, 'png', 0, heightAdd, pageWidth, customHeight);
    heightLeft -= pageHeight;
    heightAdd -= pageHeight;
  }
  doc.save('filename' + new Date().getTime() + '.pdf');
}

export default MakeToPDF;