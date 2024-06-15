export function limitString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
}

export function getFileName(path: string): string {
  // Use split para dividir a string no caractere '\'
  const parts = path.split("\\");
  // Retorna o último elemento do array, que é o nome do arquivo
  return parts[parts.length - 1];
}

export function removeSuffix(fileName) {
  // Divide a string pelo caractere '-'
  const parts = fileName.split("-");

  // Se houver mais de uma parte, retornamos a primeira parte, que é o prefixo
  if (parts.length > 1) {
    return parts[1]; // Considerando que o sufixo está no formato `prefixo-sufixo`
  }

  // Se a string não contém '-', retornamos a string original
  return fileName;
}

export function getFileNameWithoutSuffix(path: string): string {
  // Extrai o nome do arquivo do caminho completo
  const fileName = getFileName(path);
  // Remove o sufixo do nome do arquivo
  const fileNameWithoutSuffix = removeSuffix(fileName);
  // Retorna o nome do arquivo sem o sufixo
  return fileNameWithoutSuffix;
}
