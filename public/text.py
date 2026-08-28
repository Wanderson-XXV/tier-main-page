def soma1(a, b):
    print(a + b)

def soma2(a, b):
    soma = a + b
    print(soma)

def soma3(a, b):
    soma = a + b
    return soma

def soma4(a, b, c):
    soma = a + b + c
    return soma

def media(somaDasNotas):
    return somaDasNotas / 2


somaNotas = soma3(3, 10)
media = media(somaNotas)
print(f"A média das notas é: {media}")