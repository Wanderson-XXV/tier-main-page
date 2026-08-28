class SacoFarinha:
    pass # passe

class Pao:
    def __init__(self, farinha) -> None:
        pass

def show():
    print('minha função ta funcionando')


# calcular a minha nota final

def calculaMediaTrismestral(n1: float, n2: float) -> float:
    return (n1 + n2) / 2

def calculaMediaAnual(media1, media2, media3):
    return (media1 + media2 + media3) / 3




m1 = calculaMediaTrismestral(8.5, 7.0)
m2 = calculaMediaTrismestral(8.5, 6.0)
m3 = calculaMediaTrismestral(1.5, 7.0)

calculaMediaAnual(m1, m2, m3)