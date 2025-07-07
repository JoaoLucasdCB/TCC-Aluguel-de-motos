name: 🐞 Bug Report
description: Relate um problema ou comportamento inesperado
title: "[BUG] "
labels: [bug]
body:
  - type: input
    id: sistema
    attributes:
      label: Sistema Operacional
      placeholder: Ex: Windows 11, Ubuntu 22.04, etc.
    validations:
      required: true
  - type: textarea
    id: comportamento
    attributes:
      label: O que está acontecendo?
      placeholder: Descreva o problema e o comportamento esperado
    validations:
      required: true
  - type: textarea
    id: passos
    attributes:
      label: Passos para reproduzir
      placeholder: Descreva o passo a passo até o bug ocorrer
