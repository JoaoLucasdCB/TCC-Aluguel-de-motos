name: 📚 Documentação
description: Use este template para registrar tarefas de documentação
title: "[Docs] "
labels: [documentation]
body:
  - type: textarea
    id: descricao
    attributes:
      label: O que precisa ser documentado?
      placeholder: Explique o que será documentado (README, comentários de código, API, etc.)
    validations:
      required: true
  - type: dropdown
    id: tipo
    attributes:
      label: Tipo de documentação
      options:
        - README
        - Comentários de código
        - Documentação de API
        - Tutorial/Guia de uso
