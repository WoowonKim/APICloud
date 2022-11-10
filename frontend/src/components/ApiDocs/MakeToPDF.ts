import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MakeToPDF = () => {
  const converToImg = async () => {
    // html to imageFile
    const paper: any = document.querySelector(".doc");
    const canvas: any = await html2canvas(paper);
    const imageFile = canvas.toDataURL("image/png", 6.0);
    return imageFile
  }

  const converToPdf = (imageFile: any) => {
    // imageFile to pdf

    const doc = new jsPDF("p", "mm", "a4")
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.addImage(imageFile, "JPEG", 0, 0, pageWidth, pageHeight);

    // doc.save("test.pdf")
    window.open(doc.output("bloburl"))

    const pdf = new File([doc.output("blob")], "test.pdf", {
      type: "application/pdf",
    })
    return pdf
  }

  return {
    viewWithPdf: async () => {
      // html to imageFile
      const imageFile = await converToImg()

      // imageFile to Pdf
      const pdf = converToPdf(imageFile)
    }
  }
};

export default MakeToPDF;
