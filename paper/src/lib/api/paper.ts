class PaperAPI {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/file', {
      method: 'POST',
      body: formData,
    });

    const res = await response.json();
    console.log('res: ', res);

    return res;
  }
}

export const paperClient = new PaperAPI();
