import axios from "axios";

export async function download(fileLink: string) {
  try {
    axios({
      url: `${fileLink}`,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.wav");
      document.body.appendChild(link);
      link.click();
    });
  } catch (e) {
    console.log(e);
  }
}
