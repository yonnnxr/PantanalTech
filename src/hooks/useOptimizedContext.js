import { useCallback, useContext, useMemo } from 'react';

/**
 * Hook customizado para otimizar o uso de contextos React
 * Previne re-renders desnecessários e melhora performance
 * 
 * @param {React.Context} Context - O contexto React a ser usado
 * @param {Array} dependencies - Array de dependências para memoização
 * @returns {Object} Valor do contexto otimizado
 */
export const useOptimizedContext = (Context, dependencies = []) => {
  // Usar contexto com verificação de erro
  const contextValue = useContext(Context);
  
  if (!contextValue) {
    throw new Error(`${Context.displayName || 'Context'} must be used within a Provider`);
  }
  
  // Memoizar valor do contexto baseado em dependências
  const memoizedValue = useMemo(() => contextValue, [...Object.values(contextValue), ...dependencies]);
  
  return memoizedValue;
};

/**
 * Hook customizado para usar contexto com callback otimizado
 * 
 * @param {React.Context} Context - O contexto React a ser usado
 * @param {string} functionName - Nome da função a ser otimizada
 * @param {Function} callback - Função a ser otimizada
 * @returns {Function} Função otimizada
 */
export const useOptimizedCallback = (Context, functionName, callback) => {
  // Usar contexto
  const contextValue = useOptimizedContext(Context);
  
  // Criar callback otimizado
  const optimizedCallback = useCallback((...args) => {
    // Verificar se a função existe no contexto
    if (contextValue && typeof contextValue[functionName] === 'function') {
      return contextValue[functionName](...args);
    }
    
    // Se não existir, usar callback fallback
    if (typeof callback === 'function') {
      return callback(...args);
    }
    
    // Retornar undefined se nenhuma função estiver disponível
    return undefined;
  }, [contextValue, callback]);
  
  return optimizedCallback;
};

/**
 * Hook customizado para usar contexto com estado otimizado
 * 
 * @param {React.Context} Context - O contexto React a ser usado
 * @param {string} stateName - Nome do estado a ser retornado
 * @returns {*} Valor do estado otimizado
 */
export const useOptimizedState = (Context, stateName) => {
  // Usar contexto
  const contextValue = useOptimizedContext(Context);
  
  // Memoizar estado específico
  const stateValue = useMemo(() => {
    return contextValue ? contextValue[stateName] : undefined;
  }, [contextValue, stateName]);
  
  return stateValue;
};