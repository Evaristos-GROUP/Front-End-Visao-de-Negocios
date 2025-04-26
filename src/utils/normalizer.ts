export const sanitizeString = (valor: string): string => {
    return valor
      .normalize("NFD") // Remove acentos
      .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas
      .replace(/\s+/g, "_") // Substitui espaços por underscores
      .toUpperCase(); 
  };
 
  export const normalizeSubConta = (
    valor: string,
    subContasCadastradas: string[]
  ): string => {
    const sanitizedInput = sanitizeString(valor);
  
    const matchedSubConta = subContasCadastradas.find(
      (subConta) => sanitizeString(subConta) == sanitizedInput
    );
  
    if (matchedSubConta) {
      return matchedSubConta;
    }
  
    throw new Error(`Sub-conta "${valor}" não cadastrada.`);
  };

  export const normalizeFonteDeArrecadacao = (
    valor: string,
    fontesCadastradas: string[]
  ): string => {
    const sanitizedInput = sanitizeString(valor);
  
   const matchedFonte = fontesCadastradas.find(
      (fonte) => sanitizeString(fonte) == sanitizedInput
    );
  
    console.log(fontesCadastradas);
    console.log(matchedFonte);

    if (matchedFonte) {
      return matchedFonte;
    }
    throw new Error(`Fonte de arrecadação "${valor}" não cadastrada.`);
  };