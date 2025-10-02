"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  Play,
  RotateCcw,
  Star,
  Calendar,
  Brain,
  Zap,
  Award,
  Flame,
  Crown,
  Medal,
  Sparkles,
  TrendingUp,
  Users,
  Gift,
  Rocket,
  Heart,
  Shield,
  Gem,
  Swords,
  Timer,
  Volume2,
  VolumeX
} from 'lucide-react'

// Banco de questões MASSIVAMENTE expandido - 30+ questões por matéria
const questoesEnem = [
  // MATEMÁTICA (30 questões)
  {
    id: 1,
    materia: "Matemática",
    enunciado: "Uma empresa produz peças em formato cilíndrico. Se o raio da base é 3 cm e a altura é 10 cm, qual é o volume aproximado da peça?",
    alternativas: ["90π cm³", "180π cm³", "270π cm³", "360π cm³", "450π cm³"],
    resposta: 0,
    explicacao: "Volume do cilindro = π × r² × h = π × 3² × 10 = π × 9 × 10 = 90π cm³",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geometria Espacial"
  },
  {
    id: 2,
    materia: "Matemática",
    enunciado: "Em uma progressão aritmética, o primeiro termo é 5 e a razão é 3. Qual é o 10º termo?",
    alternativas: ["32", "35", "38", "41", "44"],
    resposta: 0,
    explicacao: "a₁₀ = a₁ + 9r = 5 + 9×3 = 5 + 27 = 32",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Progressões"
  },
  {
    id: 3,
    materia: "Matemática",
    enunciado: "Uma função quadrática f(x) = ax² + bx + c tem vértice no ponto (2, -1) e passa pelo ponto (0, 3). Qual é o valor de 'a'?",
    alternativas: ["1", "2", "3", "4", "5"],
    resposta: 0,
    explicacao: "Com vértice (2,-1) e passando por (0,3), temos f(x) = a(x-2)² - 1. Como f(0) = 3: a(0-2)² - 1 = 3, então 4a = 4, logo a = 1",
    dificuldade: "Difícil",
    pontos: 25,
    tema: "Funções Quadráticas"
  },
  {
    id: 4,
    materia: "Matemática",
    enunciado: "Qual é a área de um triângulo equilátero de lado 6 cm?",
    alternativas: ["9√3 cm²", "18√3 cm²", "12√3 cm²", "6√3 cm²", "24√3 cm²"],
    resposta: 0,
    explicacao: "Área = (l²√3)/4 = (6²√3)/4 = (36√3)/4 = 9√3 cm²",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geometria Plana"
  },
  {
    id: 5,
    materia: "Matemática",
    enunciado: "Se log₂(x) = 3, então x é igual a:",
    alternativas: ["6", "8", "9", "12", "16"],
    resposta: 1,
    explicacao: "log₂(x) = 3 significa que 2³ = x, portanto x = 8",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Logaritmos"
  },
  {
    id: 6,
    materia: "Matemática",
    enunciado: "A soma dos 10 primeiros termos de uma progressão geométrica com primeiro termo 2 e razão 3 é:",
    alternativas: ["59048", "59049", "118096", "118098", "177147"],
    resposta: 0,
    explicacao: "S₁₀ = a₁(qⁿ-1)/(q-1) = 2(3¹⁰-1)/(3-1) = 2(59049-1)/2 = 59048",
    dificuldade: "Difícil",
    pontos: 25,
    tema: "Progressões"
  },
  {
    id: 7,
    materia: "Matemática",
    enunciado: "Quantas diagonais possui um polígono de 12 lados?",
    alternativas: ["54", "66", "72", "84", "96"],
    resposta: 0,
    explicacao: "Número de diagonais = n(n-3)/2 = 12(12-3)/2 = 12×9/2 = 54",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geometria Plana"
  },
  {
    id: 8,
    materia: "Matemática",
    enunciado: "Se sen(x) = 3/5 e x está no primeiro quadrante, então cos(x) é:",
    alternativas: ["4/5", "3/4", "5/4", "5/3", "4/3"],
    resposta: 0,
    explicacao: "Usando a relação fundamental: sen²(x) + cos²(x) = 1. Como sen(x) = 3/5, temos (3/5)² + cos²(x) = 1, então cos²(x) = 1 - 9/25 = 16/25, logo cos(x) = 4/5 (positivo no 1º quadrante)",
    dificuldade: "Média",
    pontos: 15,
    tema: "Trigonometria"
  },
  {
    id: 9,
    materia: "Matemática",
    enunciado: "A derivada da função f(x) = x³ - 2x² + 5x - 1 é:",
    alternativas: ["3x² - 4x + 5", "3x² - 2x + 5", "x² - 4x + 5", "3x² - 4x + 1", "3x² - 4x - 1"],
    resposta: 0,
    explicacao: "f'(x) = 3x² - 2(2x) + 5 = 3x² - 4x + 5",
    dificuldade: "Média",
    pontos: 15,
    tema: "Cálculo"
  },
  {
    id: 10,
    materia: "Matemática",
    enunciado: "Em uma urna há 5 bolas vermelhas e 3 bolas azuis. Qual a probabilidade de retirar uma bola vermelha?",
    alternativas: ["5/8", "3/8", "5/3", "8/5", "1/2"],
    resposta: 0,
    explicacao: "P(vermelha) = número de bolas vermelhas / total de bolas = 5/(5+3) = 5/8",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Probabilidade"
  },
  {
    id: 11,
    materia: "Matemática",
    enunciado: "O valor de x na equação 2^(x+1) = 32 é:",
    alternativas: ["4", "5", "6", "3", "2"],
    resposta: 0,
    explicacao: "2^(x+1) = 32 = 2⁵, então x+1 = 5, logo x = 4",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Equações Exponenciais"
  },
  {
    id: 12,
    materia: "Matemática",
    enunciado: "A área de um círculo de raio 5 cm é:",
    alternativas: ["25π cm²", "10π cm²", "50π cm²", "15π cm²", "20π cm²"],
    resposta: 0,
    explicacao: "Área = πr² = π × 5² = 25π cm²",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geometria Plana"
  },
  {
    id: 13,
    materia: "Matemática",
    enunciado: "Se f(x) = 2x + 3 e g(x) = x - 1, então f(g(2)) é:",
    alternativas: ["5", "7", "3", "9", "1"],
    resposta: 0,
    explicacao: "g(2) = 2 - 1 = 1, então f(g(2)) = f(1) = 2(1) + 3 = 5",
    dificuldade: "Média",
    pontos: 15,
    tema: "Funções Compostas"
  },
  {
    id: 14,
    materia: "Matemática",
    enunciado: "O conjunto solução da inequação x² - 5x + 6 < 0 é:",
    alternativas: ["(2, 3)", "(1, 6)", "(-∞, 2) ∪ (3, +∞)", "(-∞, 1) ∪ (6, +∞)", "(0, 5)"],
    resposta: 0,
    explicacao: "Fatorando: (x-2)(x-3) < 0. As raízes são 2 e 3. A parábola é negativa entre as raízes, então x ∈ (2, 3)",
    dificuldade: "Média",
    pontos: 15,
    tema: "Inequações"
  },
  {
    id: 15,
    materia: "Matemática",
    enunciado: "A mediana do conjunto {2, 5, 3, 8, 1, 9, 4} é:",
    alternativas: ["4", "3", "5", "6", "7"],
    resposta: 0,
    explicacao: "Ordenando: {1, 2, 3, 4, 5, 8, 9}. A mediana é o valor central (4º elemento) = 4",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Estatística"
  },
  {
    id: 16,
    materia: "Matemática",
    enunciado: "O volume de uma esfera de raio 3 cm é:",
    alternativas: ["36π cm³", "27π cm³", "54π cm³", "18π cm³", "72π cm³"],
    resposta: 0,
    explicacao: "Volume = (4/3)πr³ = (4/3)π(3)³ = (4/3)π(27) = 36π cm³",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geometria Espacial"
  },
  {
    id: 17,
    materia: "Matemática",
    enunciado: "Se tg(x) = 1, então x pode ser:",
    alternativas: ["45°", "30°", "60°", "90°", "0°"],
    resposta: 0,
    explicacao: "tg(45°) = 1, pois sen(45°) = cos(45°) = √2/2",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Trigonometria"
  },
  {
    id: 18,
    materia: "Matemática",
    enunciado: "A soma dos ângulos internos de um hexágono é:",
    alternativas: ["720°", "540°", "900°", "1080°", "360°"],
    resposta: 0,
    explicacao: "Soma = (n-2) × 180° = (6-2) × 180° = 4 × 180° = 720°",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geometria Plana"
  },
  {
    id: 19,
    materia: "Matemática",
    enunciado: "O número de anagramas da palavra AMOR é:",
    alternativas: ["24", "12", "6", "4", "8"],
    resposta: 0,
    explicacao: "4! = 4 × 3 × 2 × 1 = 24 anagramas",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Análise Combinatória"
  },
  {
    id: 20,
    materia: "Matemática",
    enunciado: "Se log₁₀(x) = 2, então x é:",
    alternativas: ["100", "10", "20", "1000", "50"],
    resposta: 0,
    explicacao: "log₁₀(x) = 2 significa que 10² = x, portanto x = 100",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Logaritmos"
  },
  {
    id: 21,
    materia: "Matemática",
    enunciado: "A distância entre os pontos A(1, 2) e B(4, 6) é:",
    alternativas: ["5", "3", "4", "6", "7"],
    resposta: 0,
    explicacao: "d = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geometria Analítica"
  },
  {
    id: 22,
    materia: "Matemática",
    enunciado: "O valor de ∫(2x + 1)dx é:",
    alternativas: ["x² + x + C", "2x² + x + C", "x² + 2x + C", "2x + C", "x² + C"],
    resposta: 0,
    explicacao: "∫(2x + 1)dx = ∫2x dx + ∫1 dx = x² + x + C",
    dificuldade: "Média",
    pontos: 15,
    tema: "Cálculo Integral"
  },
  {
    id: 23,
    materia: "Matemática",
    enunciado: "Em um triângulo retângulo, se um cateto mede 3 cm e a hipotenusa mede 5 cm, o outro cateto mede:",
    alternativas: ["4 cm", "6 cm", "2 cm", "8 cm", "7 cm"],
    resposta: 0,
    explicacao: "Pelo teorema de Pitágoras: 3² + b² = 5², então 9 + b² = 25, logo b² = 16 e b = 4 cm",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geometria Plana"
  },
  {
    id: 24,
    materia: "Matemática",
    enunciado: "O coeficiente angular da reta que passa pelos pontos (1, 2) e (3, 8) é:",
    alternativas: ["3", "2", "4", "5", "6"],
    resposta: 0,
    explicacao: "m = (y₂ - y₁)/(x₂ - x₁) = (8 - 2)/(3 - 1) = 6/2 = 3",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geometria Analítica"
  },
  {
    id: 25,
    materia: "Matemática",
    enunciado: "Se 3ˣ = 81, então x é:",
    alternativas: ["4", "3", "5", "2", "6"],
    resposta: 0,
    explicacao: "3ˣ = 81 = 3⁴, portanto x = 4",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Equações Exponenciais"
  },
  {
    id: 26,
    materia: "Matemática",
    enunciado: "A moda do conjunto {2, 3, 3, 4, 5, 5, 5, 6} é:",
    alternativas: ["5", "3", "4", "6", "2"],
    resposta: 0,
    explicacao: "A moda é o valor que mais se repete. O número 5 aparece 3 vezes, mais que qualquer outro",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Estatística"
  },
  {
    id: 27,
    materia: "Matemática",
    enunciado: "O perímetro de um quadrado de área 16 cm² é:",
    alternativas: ["16 cm", "8 cm", "12 cm", "20 cm", "24 cm"],
    resposta: 0,
    explicacao: "Se área = 16 cm², então lado = 4 cm. Perímetro = 4 × 4 = 16 cm",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geometria Plana"
  },
  {
    id: 28,
    materia: "Matemática",
    enunciado: "O valor de cos(60°) é:",
    alternativas: ["1/2", "√3/2", "√2/2", "1", "0"],
    resposta: 0,
    explicacao: "cos(60°) = 1/2 (valor decorado da tabela trigonométrica)",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Trigonometria"
  },
  {
    id: 29,
    materia: "Matemática",
    enunciado: "Se f(x) = x² - 4x + 3, o valor mínimo da função é:",
    alternativas: ["-1", "0", "1", "2", "3"],
    resposta: 0,
    explicacao: "O vértice da parábola está em x = -b/2a = 4/2 = 2. f(2) = 4 - 8 + 3 = -1",
    dificuldade: "Média",
    pontos: 15,
    tema: "Funções Quadráticas"
  },
  {
    id: 30,
    materia: "Matemática",
    enunciado: "Quantos números de 3 algarismos podem ser formados com os dígitos 1, 2, 3, 4, 5 sem repetição?",
    alternativas: ["60", "125", "15", "10", "20"],
    resposta: 0,
    explicacao: "Arranjo de 5 elementos tomados 3 a 3: A₅,₃ = 5!/(5-3)! = 5!/2! = 5×4×3 = 60",
    dificuldade: "Média",
    pontos: 15,
    tema: "Análise Combinatória"
  },

  // PORTUGUÊS (30 questões)
  {
    id: 31,
    materia: "Português",
    enunciado: "Analise o trecho: 'O jovem, apesar de inteligente, não conseguiu resolver o problema.' A vírgula foi usada para:",
    alternativas: [
      "Separar adjunto adverbial deslocado",
      "Isolar aposto explicativo", 
      "Separar oração subordinada adjetiva explicativa",
      "Isolar expressão de valor concessivo",
      "Separar vocativo"
    ],
    resposta: 3,
    explicacao: "A expressão 'apesar de inteligente' tem valor concessivo e está intercalada, por isso é isolada por vírgulas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Pontuação"
  },
  {
    id: 32,
    materia: "Português",
    enunciado: "No verso 'Minha terra tem palmeiras onde canta o sabiá', a figura de linguagem predominante é:",
    alternativas: ["Metáfora", "Metonímia", "Sinestesia", "Prosopopeia", "Hipérbole"],
    resposta: 3,
    explicacao: "A prosopopeia (personificação) está presente em 'onde canta o sabiá', atribuindo ação humana (cantar) ao animal.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Figuras de Linguagem"
  },
  {
    id: 33,
    materia: "Português",
    enunciado: "Qual alternativa apresenta APENAS palavras paroxítonas?",
    alternativas: [
      "Médico, fácil, açúcar",
      "Árvore, mesa, livro", 
      "Parabéns, café, tupi",
      "Lâmpada, música, prático",
      "Sabiá, Piauí, tuiuiú"
    ],
    resposta: 1,
    explicacao: "Paroxítonas são palavras com acento tônico na penúltima sílaba: ÁR-vo-re, ME-sa, LI-vro.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Acentuação"
  },
  {
    id: 34,
    materia: "Português",
    enunciado: "Em 'Ele chegou ontem', a palavra 'ontem' exerce função sintática de:",
    alternativas: ["Sujeito", "Predicado", "Adjunto adverbial", "Complemento nominal", "Aposto"],
    resposta: 2,
    explicacao: "A palavra 'ontem' indica circunstância de tempo, exercendo função de adjunto adverbial.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Análise Sintática"
  },
  {
    id: 35,
    materia: "Português",
    enunciado: "O plural de 'cidadão' é:",
    alternativas: ["cidadões", "cidadãos", "cidadans", "cidadões", "cidadãos"],
    resposta: 1,
    explicacao: "Palavras terminadas em -ão fazem plural em -ãos quando são paroxítonas: cidadão → cidadãos.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Morfologia"
  },
  {
    id: 36,
    materia: "Português",
    enunciado: "Na frase 'Quem estuda passa no vestibular', temos:",
    alternativas: [
      "Período simples",
      "Período composto por coordenação",
      "Período composto por subordinação",
      "Período composto misto",
      "Oração sem sujeito"
    ],
    resposta: 2,
    explicacao: "Há duas orações: 'Quem estuda' (subordinada substantiva subjetiva) e 'passa no vestibular' (principal).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Análise Sintática"
  },
  {
    id: 37,
    materia: "Português",
    enunciado: "A palavra 'anticonstitucional' é formada por:",
    alternativas: [
      "Prefixação",
      "Sufixação",
      "Prefixação e sufixação",
      "Composição",
      "Derivação regressiva"
    ],
    resposta: 2,
    explicacao: "A palavra tem o prefixo 'anti-' e o sufixo '-al' adicionados à base 'constitucion-'.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Morfologia"
  },
  {
    id: 38,
    materia: "Português",
    enunciado: "Em 'Choveu muito ontem', o sujeito é:",
    alternativas: ["Muito", "Ontem", "Oculto", "Inexistente", "Indeterminado"],
    resposta: 3,
    explicacao: "Verbos que indicam fenômenos da natureza são impessoais, não têm sujeito.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Análise Sintática"
  },
  {
    id: 39,
    materia: "Português",
    enunciado: "A concordância está CORRETA em:",
    alternativas: [
      "Fazem dois anos que ele partiu",
      "Houveram muitos problemas",
      "Deve haver soluções",
      "Podem haver dúvidas",
      "Haviam muitas pessoas"
    ],
    resposta: 2,
    explicacao: "O verbo 'haver' no sentido de 'existir' é impessoal. 'Deve' concorda com o verbo principal 'haver'.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Concordância Verbal"
  },
  {
    id: 40,
    materia: "Português",
    enunciado: "O feminino de 'poeta' é:",
    alternativas: ["poeta", "poetisa", "poetriz", "poetinha", "poetessa"],
    resposta: 1,
    explicacao: "O feminino de 'poeta' é 'poetisa', forma consagrada pelo uso.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Morfologia"
  },
  {
    id: 41,
    materia: "Português",
    enunciado: "Em 'Ele é um homem de palavra', temos uma:",
    alternativas: ["Metáfora", "Metonímia", "Catacrese", "Sinédoque", "Hipérbole"],
    resposta: 1,
    explicacao: "Metonímia: substituição de 'confiável' por 'de palavra' (qualidade pela característica).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Figuras de Linguagem"
  },
  {
    id: 42,
    materia: "Português",
    enunciado: "A regência está CORRETA em:",
    alternativas: [
      "Ele assistiu o filme",
      "Prefiro mais cinema que teatro",
      "Ele chegou em casa",
      "Simpatizo com você",
      "Ele namora com ela"
    ],
    resposta: 3,
    explicacao: "O verbo 'simpatizar' é transitivo indireto e pede preposição 'com'.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Regência"
  },
  {
    id: 43,
    materia: "Português",
    enunciado: "O aumentativo de 'casa' é:",
    alternativas: ["casinha", "casarão", "casita", "casona", "casão"],
    resposta: 1,
    explicacao: "O aumentativo sintético de 'casa' é 'casarão'.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Morfologia"
  },
  {
    id: 44,
    materia: "Português",
    enunciado: "Em 'Ele disse que viria', o verbo 'viria' está no:",
    alternativas: [
      "Futuro do presente",
      "Futuro do pretérito",
      "Pretérito imperfeito",
      "Presente do subjuntivo",
      "Pretérito mais-que-perfeito"
    ],
    resposta: 1,
    explicacao: "'Viria' é futuro do pretérito do indicativo, indicando ação futura em relação ao passado.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Verbos"
  },
  {
    id: 45,
    materia: "Português",
    enunciado: "A palavra 'bênção' é acentuada por ser:",
    alternativas: [
      "Oxítona terminada em -ão",
      "Paroxítona terminada em -ão",
      "Proparoxítona",
      "Monossílaba tônica",
      "Hiato"
    ],
    resposta: 1,
    explicacao: "Paroxítonas terminadas em -ão são acentuadas: bên-ção.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Acentuação"
  },
  {
    id: 46,
    materia: "Português",
    enunciado: "Em 'Comprei um livro para João', o termo 'para João' é:",
    alternativas: [
      "Objeto direto",
      "Objeto indireto",
      "Complemento nominal",
      "Adjunto adverbial",
      "Predicativo"
    ],
    resposta: 1,
    explicacao: "'Para João' completa o sentido do verbo 'comprar', sendo objeto indireto.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Análise Sintática"
  },
  {
    id: 47,
    materia: "Português",
    enunciado: "O coletivo de 'abelha' é:",
    alternativas: ["enxame", "cardume", "matilha", "alcateia", "bando"],
    resposta: 0,
    explicacao: "O coletivo específico de abelhas é 'enxame'.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Semântica"
  },
  {
    id: 48,
    materia: "Português",
    enunciado: "Em 'Ele é inteligente como o pai', temos:",
    alternativas: ["Comparação", "Metáfora", "Metonímia", "Hipérbole", "Ironia"],
    resposta: 0,
    explicacao: "A presença do conectivo 'como' caracteriza uma comparação (símile).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Figuras de Linguagem"
  },
  {
    id: 49,
    materia: "Português",
    enunciado: "A palavra 'girassol' é formada por:",
    alternativas: [
      "Derivação prefixal",
      "Derivação sufixal",
      "Composição por justaposição",
      "Composição por aglutinação",
      "Derivação regressiva"
    ],
    resposta: 2,
    explicacao: "'Girassol' é formada pela junção de 'gira' + 'sol' sem alteração fonética.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Morfologia"
  },
  {
    id: 50,
    materia: "Português",
    enunciado: "O antônimo de 'bonito' é:",
    alternativas: ["belo", "formoso", "feio", "lindo", "gracioso"],
    resposta: 2,
    explicacao: "Antônimo é palavra de sentido oposto. 'Feio' é o contrário de 'bonito'.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Semântica"
  },
  {
    id: 51,
    materia: "Português",
    enunciado: "Em 'Vossa Excelência chegou', a concordância do verbo deve ser:",
    alternativas: [
      "Com a 2ª pessoa",
      "Com a 3ª pessoa",
      "Com a 1ª pessoa",
      "Tanto faz",
      "Depende do contexto"
    ],
    resposta: 1,
    explicacao: "Pronomes de tratamento levam o verbo para a 3ª pessoa, mesmo se referindo à 2ª.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Concordância Verbal"
  },
  {
    id: 52,
    materia: "Português",
    enunciado: "A palavra 'pé-de-moleque' tem quantos morfemas?",
    alternativas: ["2", "3", "4", "5", "6"],
    resposta: 2,
    explicacao: "Morfemas: 'pé' + 'de' + 'moleque' + 'e' (vogal temática) = 4 morfemas.",
    dificuldade: "Difícil",
    pontos: 25,
    tema: "Morfologia"
  },
  {
    id: 53,
    materia: "Português",
    enunciado: "Em 'Ele falou alto', a palavra 'alto' é:",
    alternativas: ["Adjetivo", "Advérbio", "Substantivo", "Pronome", "Verbo"],
    resposta: 1,
    explicacao: "'Alto' modifica o verbo 'falou', indicando modo, portanto é advérbio.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Morfologia"
  },
  {
    id: 54,
    materia: "Português",
    enunciado: "O superlativo absoluto sintético de 'fácil' é:",
    alternativas: ["muito fácil", "facilíssimo", "mais fácil", "tão fácil", "bem fácil"],
    resposta: 1,
    explicacao: "O superlativo sintético de 'fácil' é 'facilíssimo' (radical + sufixo -íssimo).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Morfologia"
  },
  {
    id: 55,
    materia: "Português",
    enunciado: "Em 'Que bela manhã!', temos:",
    alternativas: [
      "Oração exclamativa",
      "Oração interrogativa",
      "Oração declarativa",
      "Oração imperativa",
      "Oração optativa"
    ],
    resposta: 0,
    explicacao: "A exclamação é marcada pelo ponto de exclamação e pela entonação emotiva.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Tipos de Frase"
  },
  {
    id: 56,
    materia: "Português",
    enunciado: "A crase é obrigatória em:",
    alternativas: [
      "Vou a pé",
      "Refiro-me a você",
      "Vou à escola",
      "Estou a trabalhar",
      "Daqui a pouco"
    ],
    resposta: 2,
    explicacao: "Há crase antes de palavra feminina determinada: 'à escola' (a + a escola).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Crase"
  },
  {
    id: 57,
    materia: "Português",
    enunciado: "O gerúndio de 'fazer' é:",
    alternativas: ["fazendo", "feito", "fez", "fará", "fizesse"],
    resposta: 0,
    explicacao: "O gerúndio é formado pelo radical + -ndo: faze + ndo = fazendo.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Verbos"
  },
  {
    id: 58,
    materia: "Português",
    enunciado: "Em 'João, venha cá!', o termo 'João' é:",
    alternativas: ["Sujeito", "Vocativo", "Aposto", "Predicativo", "Objeto"],
    resposta: 1,
    explicacao: "'João' é vocativo, termo usado para chamar ou interpelar alguém.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Análise Sintática"
  },
  {
    id: 59,
    materia: "Português",
    enunciado: "A palavra 'óculos' é:",
    alternativas: [
      "Sempre singular",
      "Sempre plural",
      "Pode ser singular ou plural",
      "Não tem número",
      "Depende do contexto"
    ],
    resposta: 1,
    explicacao: "'Óculos' é substantivo que só existe no plural (pluralia tantum).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Morfologia"
  },
  {
    id: 60,
    materia: "Português",
    enunciado: "Em 'Ele chegou meio cansado', a palavra 'meio' é:",
    alternativas: ["Adjetivo", "Advérbio", "Numeral", "Substantivo", "Pronome"],
    resposta: 1,
    explicacao: "'Meio' modifica o adjetivo 'cansado', sendo advérbio (= um pouco).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Morfologia"
  },

  // HISTÓRIA (30 questões)
  {
    id: 61,
    materia: "História",
    enunciado: "A Revolução Industrial iniciada na Inglaterra no século XVIII caracterizou-se principalmente por:",
    alternativas: [
      "Substituição do trabalho manual pela máquina",
      "Desenvolvimento da agricultura",
      "Fortalecimento do sistema feudal", 
      "Expansão do comércio marítimo",
      "Crescimento das corporações de ofício"
    ],
    resposta: 0,
    explicacao: "A principal característica da Revolução Industrial foi a mecanização da produção, substituindo o trabalho manual artesanal pela produção em massa com máquinas.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Revolução Industrial"
  },
  {
    id: 62,
    materia: "História",
    enunciado: "O período conhecido como 'Era Vargas' no Brasil compreende os anos de:",
    alternativas: ["1920-1945", "1930-1945", "1935-1950", "1940-1955", "1925-1940"],
    resposta: 1,
    explicacao: "A Era Vargas compreende o período de 1930 a 1945, desde a Revolução de 1930 até a deposição de Getúlio Vargas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "História do Brasil"
  },
  {
    id: 63,
    materia: "História",
    enunciado: "A Guerra Fria foi caracterizada principalmente por:",
    alternativas: [
      "Conflito militar direto entre EUA e URSS",
      "Disputa ideológica e corrida armamentista",
      "Guerra comercial entre capitalismo e socialismo",
      "Conflito religioso entre cristãos e comunistas",
      "Disputa territorial na Europa"
    ],
    resposta: 1,
    explicacao: "A Guerra Fria foi marcada pela tensão ideológica entre capitalismo (EUA) e socialismo (URSS), sem confronto militar direto.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Guerra Fria"
  },
  {
    id: 64,
    materia: "História",
    enunciado: "A Proclamação da República no Brasil ocorreu em:",
    alternativas: ["15 de novembro de 1889", "7 de setembro de 1822", "13 de maio de 1888", "15 de novembro de 1888", "7 de abril de 1831"],
    resposta: 0,
    explicacao: "A Proclamação da República brasileira foi proclamada em 15 de novembro de 1889 pelo Marechal Deodoro da Fonseca.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "História do Brasil"
  },
  {
    id: 65,
    materia: "História",
    enunciado: "O Renascimento Cultural teve início em qual país?",
    alternativas: ["França", "Espanha", "Itália", "Inglaterra", "Alemanha"],
    resposta: 2,
    explicacao: "O Renascimento teve início na Itália, especialmente em cidades como Florença, Veneza e Roma, no século XIV.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Renascimento"
  },
  {
    id: 66,
    materia: "História",
    enunciado: "A Primeira Guerra Mundial ocorreu entre os anos de:",
    alternativas: ["1912-1918", "1914-1918", "1916-1920", "1914-1919", "1913-1917"],
    resposta: 1,
    explicacao: "A Primeira Guerra Mundial durou de 1914 a 1918, iniciando com o assassinato do arquiduque Francisco Ferdinando.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Primeira Guerra Mundial"
  },
  {
    id: 67,
    materia: "História",
    enunciado: "O sistema feudal caracterizou-se por:",
    alternativas: [
      "Economia monetária desenvolvida",
      "Relações de vassalagem e suserania",
      "Forte centralização política",
      "Desenvolvimento urbano intenso",
      "Comércio internacional ativo"
    ],
    resposta: 1,
    explicacao: "O feudalismo baseava-se nas relações pessoais de vassalagem (fidelidade) e suserania (proteção) entre senhores e vassalos.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Feudalismo"
  },
  {
    id: 68,
    materia: "História",
    enunciado: "A Revolução Francesa iniciou-se em:",
    alternativas: ["1789", "1792", "1799", "1804", "1815"],
    resposta: 0,
    explicacao: "A Revolução Francesa começou em 1789 com a convocação dos Estados Gerais e a Queda da Bastilha.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Revolução Francesa"
  },
  {
    id: 69,
    materia: "História",
    enunciado: "O descobrimento do Brasil pelos portugueses ocorreu em:",
    alternativas: ["22 de abril de 1500", "22 de abril de 1501", "21 de abril de 1500", "23 de abril de 1500", "22 de março de 1500"],
    resposta: 0,
    explicacao: "Pedro Álvares Cabral chegou ao Brasil em 22 de abril de 1500, data oficial do descobrimento.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Brasil Colônia"
  },
  {
    id: 70,
    materia: "História",
    enunciado: "A Independência do Brasil foi proclamada por:",
    alternativas: ["Dom Pedro I", "Dom Pedro II", "José Bonifácio", "Tiradentes", "Dom João VI"],
    resposta: 0,
    explicacao: "Dom Pedro I proclamou a independência do Brasil às margens do rio Ipiranga em 7 de setembro de 1822.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Independência do Brasil"
  },
  {
    id: 71,
    materia: "História",
    enunciado: "A Segunda Guerra Mundial terminou em:",
    alternativas: ["1944", "1945", "1946", "1947", "1943"],
    resposta: 1,
    explicacao: "A Segunda Guerra Mundial terminou em 1945 com a rendição do Japão após as bombas atômicas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Segunda Guerra Mundial"
  },
  {
    id: 72,
    materia: "História",
    enunciado: "O Império Romano do Ocidente caiu em:",
    alternativas: ["476 d.C.", "455 d.C.", "410 d.C.", "500 d.C.", "395 d.C."],
    resposta: 0,
    explicacao: "O Império Romano do Ocidente caiu em 476 d.C. com a deposição do último imperador, Rômulo Augusto.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Império Romano"
  },
  {
    id: 73,
    materia: "História",
    enunciado: "A Inconfidência Mineira ocorreu em:",
    alternativas: ["1789", "1792", "1798", "1822", "1831"],
    resposta: 0,
    explicacao: "A Inconfidência Mineira foi um movimento separatista que ocorreu em 1789 em Minas Gerais.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Brasil Colônia"
  },
  {
    id: 74,
    materia: "História",
    enunciado: "O Tratado de Versalhes foi assinado em:",
    alternativas: ["1918", "1919", "1920", "1921", "1917"],
    resposta: 1,
    explicacao: "O Tratado de Versalhes foi assinado em 1919, oficializando o fim da Primeira Guerra Mundial.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Primeira Guerra Mundial"
  },
  {
    id: 75,
    materia: "História",
    enunciado: "A Abolição da Escravatura no Brasil ocorreu em:",
    alternativas: ["13 de maio de 1888", "13 de maio de 1889", "15 de novembro de 1888", "7 de setembro de 1888", "13 de abril de 1888"],
    resposta: 0,
    explicacao: "A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada pela Princesa Isabel em 13 de maio de 1888.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Brasil Império"
  },
  {
    id: 76,
    materia: "História",
    enunciado: "As Cruzadas foram:",
    alternativas: [
      "Guerras entre cristãos e muçulmanos",
      "Expedições comerciais",
      "Movimentos artísticos",
      "Reformas religiosas",
      "Descobrimentos marítimos"
    ],
    resposta: 0,
    explicacao: "As Cruzadas foram expedições militares cristãs para reconquistar a Terra Santa dos muçulmanos (séculos XI-XIII).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Idade Média"
  },
  {
    id: 77,
    materia: "História",
    enunciado: "A Reforma Protestante foi iniciada por:",
    alternativas: ["João Calvino", "Martinho Lutero", "Henrique VIII", "Ulrico Zuínglio", "Thomas Münzer"],
    resposta: 1,
    explicacao: "Martinho Lutero iniciou a Reforma Protestante em 1517 com suas 95 teses contra as indulgências.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Reforma Protestante"
  },
  {
    id: 78,
    materia: "História",
    enunciado: "O Estado Novo no Brasil durou de:",
    alternativas: ["1937-1945", "1930-1945", "1935-1945", "1937-1946", "1930-1937"],
    resposta: 0,
    explicacao: "O Estado Novo foi o período ditatorial de Getúlio Vargas que durou de 1937 a 1945.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Era Vargas"
  },
  {
    id: 79,
    materia: "História",
    enunciado: "A Revolução Russa ocorreu em:",
    alternativas: ["1917", "1918", "1919", "1916", "1920"],
    resposta: 0,
    explicacao: "A Revolução Russa ocorreu em 1917, derrubando o czarismo e levando os bolcheviques ao poder.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Revolução Russa"
  },
  {
    id: 80,
    materia: "História",
    enunciado: "O Muro de Berlim foi construído em:",
    alternativas: ["1961", "1962", "1960", "1963", "1959"],
    resposta: 0,
    explicacao: "O Muro de Berlim foi construído em 1961 para separar Berlim Oriental da Ocidental durante a Guerra Fria.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Guerra Fria"
  },
  {
    id: 81,
    materia: "História",
    enunciado: "A Conjuração Baiana ocorreu em:",
    alternativas: ["1798", "1789", "1792", "1822", "1831"],
    resposta: 0,
    explicacao: "A Conjuração Baiana (Revolta dos Alfaiates) foi um movimento separatista que ocorreu na Bahia em 1798.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Brasil Colônia"
  },
  {
    id: 82,
    materia: "História",
    enunciado: "O Império Bizantino teve sua capital em:",
    alternativas: ["Roma", "Constantinopla", "Atenas", "Alexandria", "Antioquia"],
    resposta: 1,
    explicacao: "Constantinopla (atual Istambul) foi a capital do Império Bizantino por mais de mil anos.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Império Bizantino"
  },
  {
    id: 83,
    materia: "História",
    enunciado: "A Guerra do Paraguai durou de:",
    alternativas: ["1864-1870", "1865-1870", "1864-1869", "1863-1870", "1865-1871"],
    resposta: 0,
    explicacao: "A Guerra do Paraguai foi o maior conflito armado da América do Sul, durando de 1864 a 1870.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Brasil Império"
  },
  {
    id: 84,
    materia: "História",
    enunciado: "A Peste Negra assolou a Europa no século:",
    alternativas: ["XIII", "XIV", "XV", "XII", "XVI"],
    resposta: 1,
    explicacao: "A Peste Negra devastou a Europa no século XIV (1347-1353), matando cerca de um terço da população.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Idade Média"
  },
  {
    id: 85,
    materia: "História",
    enunciado: "O Plano Marshall foi:",
    alternativas: [
      "Um plano militar americano",
      "Um programa de reconstrução da Europa",
      "Uma estratégia de guerra",
      "Um acordo comercial",
      "Uma aliança militar"
    ],
    resposta: 1,
    explicacao: "O Plano Marshall foi um programa americano de ajuda econômica para reconstruir a Europa após a Segunda Guerra Mundial.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Guerra Fria"
  },
  {
    id: 86,
    materia: "História",
    enunciado: "A Ditadura Militar no Brasil durou de:",
    alternativas: ["1964-1985", "1964-1984", "1965-1985", "1964-1986", "1963-1985"],
    resposta: 0,
    explicacao: "A Ditadura Militar brasileira durou de 1964 (golpe militar) até 1985 (Nova República).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Brasil República"
  },
  {
    id: 87,
    materia: "História",
    enunciado: "A Revolução Industrial teve início no século:",
    alternativas: ["XVII", "XVIII", "XIX", "XVI", "XX"],
    resposta: 1,
    explicacao: "A Primeira Revolução Industrial iniciou-se na Inglaterra no século XVIII (por volta de 1760).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Revolução Industrial"
  },
  {
    id: 88,
    materia: "História",
    enunciado: "O Iluminismo foi um movimento:",
    alternativas: [
      "Religioso",
      "Artístico",
      "Filosófico e intelectual",
      "Político apenas",
      "Econômico"
    ],
    resposta: 2,
    explicacao: "O Iluminismo foi um movimento filosófico e intelectual do século XVIII que valorizava a razão e o conhecimento científico.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Iluminismo"
  },
  {
    id: 89,
    materia: "História",
    enunciado: "A Queda do Muro de Berlim ocorreu em:",
    alternativas: ["1989", "1990", "1988", "1991", "1987"],
    resposta: 0,
    explicacao: "O Muro de Berlim foi derrubado em 9 de novembro de 1989, simbolizando o fim da Guerra Fria.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Guerra Fria"
  },
  {
    id: 90,
    materia: "História",
    enunciado: "A Semana de Arte Moderna ocorreu em:",
    alternativas: ["1922", "1920", "1924", "1925", "1921"],
    resposta: 0,
    explicacao: "A Semana de Arte Moderna foi realizada em São Paulo em fevereiro de 1922, marco do modernismo brasileiro.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Brasil República"
  },

  // BIOLOGIA (30 questões)
  {
    id: 91,
    materia: "Biologia",
    enunciado: "A fotossíntese é um processo fundamental para a vida na Terra. Qual é a equação geral simplificada deste processo?",
    alternativas: [
      "CO₂ + H₂O + luz → C₆H₁₂O₆ + O₂",
      "C₆H₁₂O₆ + O₂ → CO₂ + H₂O + ATP",
      "N₂ + H₂ → NH₃",
      "H₂O → H⁺ + OH⁻",
      "ATP → ADP + Pi + energia"
    ],
    resposta: 0,
    explicacao: "Na fotossíntese, as plantas convertem CO₂ e H₂O em glicose (C₆H₁₂O₆) e oxigênio, utilizando energia luminosa.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Fotossíntese"
  },
  {
    id: 92,
    materia: "Biologia",
    enunciado: "Qual é a principal função dos ribossomos na célula?",
    alternativas: [
      "Produção de energia",
      "Síntese de proteínas",
      "Digestão celular",
      "Transporte de substâncias",
      "Divisão celular"
    ],
    resposta: 1,
    explicacao: "Os ribossomos são responsáveis pela síntese de proteínas, traduzindo o RNA mensageiro em cadeias polipeptídicas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Citologia"
  },
  {
    id: 93,
    materia: "Biologia",
    enunciado: "Na genética, um indivíduo heterozigoto para uma característica possui:",
    alternativas: [
      "Dois alelos iguais",
      "Dois alelos diferentes", 
      "Apenas um alelo",
      "Três alelos",
      "Nenhum alelo"
    ],
    resposta: 1,
    explicacao: "Heterozigoto significa que o indivíduo possui dois alelos diferentes para uma mesma característica (ex: Aa).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Genética"
  },
  {
    id: 94,
    materia: "Biologia",
    enunciado: "As mitocôndrias são responsáveis por:",
    alternativas: [
      "Síntese de proteínas",
      "Produção de ATP",
      "Digestão celular",
      "Síntese de lipídios",
      "Divisão celular"
    ],
    resposta: 1,
    explicacao: "As mitocôndrias são as 'usinas de energia' da célula, produzindo ATP através da respiração celular.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Citologia"
  },
  {
    id: 95,
    materia: "Biologia",
    enunciado: "O DNA é composto por:",
    alternativas: [
      "Aminoácidos",
      "Nucleotídeos",
      "Monossacarídeos",
      "Ácidos graxos",
      "Peptídeos"
    ],
    resposta: 1,
    explicacao: "O DNA é formado por nucleotídeos, cada um contendo uma base nitrogenada, um açúcar (desoxirribose) e um fosfato.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Biologia Molecular"
  },
  {
    id: 96,
    materia: "Biologia",
    enunciado: "A respiração celular ocorre principalmente:",
    alternativas: [
      "No núcleo",
      "Nas mitocôndrias",
      "No citoplasma",
      "No retículo endoplasmático",
      "Nos ribossomos"
    ],
    resposta: 1,
    explicacao: "A respiração celular ocorre principalmente nas mitocôndrias, onde o oxigênio é usado para produzir ATP.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Respiração Celular"
  },
  {
    id: 97,
    materia: "Biologia",
    enunciado: "Os cromossomos são formados por:",
    alternativas: [
      "DNA e proteínas",
      "RNA e lipídios",
      "Proteínas e carboidratos",
      "DNA e carboidratos",
      "RNA e proteínas"
    ],
    resposta: 0,
    explicacao: "Os cromossomos são estruturas formadas por DNA associado a proteínas histonas, organizando o material genético.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Citologia"
  },
  {
    id: 98,
    materia: "Biologia",
    enunciado: "A meiose é importante porque:",
    alternativas: [
      "Produz células diploides",
      "Produz células haploides",
      "Repara o DNA",
      "Sintetiza proteínas",
      "Produz energia"
    ],
    resposta: 1,
    explicacao: "A meiose produz gametas haploides (n), reduzindo pela metade o número de cromossomos para a reprodução sexuada.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Divisão Celular"
  },
  {
    id: 99,
    materia: "Biologia",
    enunciado: "As enzimas são:",
    alternativas: [
      "Carboidratos",
      "Lipídios",
      "Proteínas",
      "Ácidos nucleicos",
      "Vitaminas"
    ],
    resposta: 2,
    explicacao: "As enzimas são proteínas que catalisam reações bioquímicas, acelerando processos metabólicos.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Bioquímica"
  },
  {
    id: 100,
    materia: "Biologia",
    enunciado: "O sistema circulatório humano é:",
    alternativas: [
      "Aberto",
      "Fechado",
      "Simples",
      "Incompleto",
      "Ausente"
    ],
    resposta: 1,
    explicacao: "O sistema circulatório humano é fechado, pois o sangue circula sempre dentro de vasos sanguíneos.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Fisiologia"
  },
  {
    id: 101,
    materia: "Biologia",
    enunciado: "A função do sistema nervoso é:",
    alternativas: [
      "Transportar nutrientes",
      "Coordenar e controlar funções corporais",
      "Produzir hormônios",
      "Filtrar o sangue",
      "Digerir alimentos"
    ],
    resposta: 1,
    explicacao: "O sistema nervoso coordena e controla as funções corporais através de impulsos elétricos e neurotransmissores.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Fisiologia"
  },
  {
    id: 102,
    materia: "Biologia",
    enunciado: "A evolução das espécies foi proposta por:",
    alternativas: [
      "Gregor Mendel",
      "Charles Darwin",
      "Louis Pasteur",
      "Alexander Fleming",
      "Watson e Crick"
    ],
    resposta: 1,
    explicacao: "Charles Darwin propôs a teoria da evolução por seleção natural em 'A Origem das Espécies' (1859).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Evolução"
  },
  {
    id: 103,
    materia: "Biologia",
    enunciado: "Os vírus são considerados:",
    alternativas: [
      "Seres vivos completos",
      "Parasitas intracelulares obrigatórios",
      "Bactérias pequenas",
      "Fungos microscópicos",
      "Protozoários"
    ],
    resposta: 1,
    explicacao: "Os vírus são parasitas intracelulares obrigatórios, pois só se reproduzem dentro de células hospedeiras.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Microbiologia"
  },
  {
    id: 104,
    materia: "Biologia",
    enunciado: "A parede celular está presente em:",
    alternativas: [
      "Células animais",
      "Células vegetais",
      "Apenas bactérias",
      "Apenas fungos",
      "Todas as células"
    ],
    resposta: 1,
    explicacao: "A parede celular é característica das células vegetais, fornecendo proteção e sustentação estrutural.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Citologia"
  },
  {
    id: 105,
    materia: "Biologia",
    enunciado: "O processo de digestão inicia-se:",
    alternativas: [
      "No estômago",
      "Na boca",
      "No intestino delgado",
      "No esôfago",
      "No intestino grosso"
    ],
    resposta: 1,
    explicacao: "A digestão inicia-se na boca com a mastigação e ação da enzima amilase salivar sobre o amido.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Fisiologia"
  },
  {
    id: 106,
    materia: "Biologia",
    enunciado: "Os anticorpos são produzidos por:",
    alternativas: [
      "Glóbulos vermelhos",
      "Linfócitos B",
      "Plaquetas",
      "Neutrófilos",
      "Macrófagos"
    ],
    resposta: 1,
    explicacao: "Os linfócitos B são responsáveis pela produção de anticorpos na resposta imune humoral.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Imunologia"
  },
  {
    id: 107,
    materia: "Biologia",
    enunciado: "A fotossíntese ocorre:",
    alternativas: [
      "Nas mitocôndrias",
      "Nos cloroplastos",
      "No núcleo",
      "No citoplasma",
      "Nos ribossomos"
    ],
    resposta: 1,
    explicacao: "A fotossíntese ocorre nos cloroplastos, organelas que contêm clorofila e outros pigmentos fotossintéticos.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Fotossíntese"
  },
  {
    id: 108,
    materia: "Biologia",
    enunciado: "O código genético é:",
    alternativas: [
      "Específico para cada espécie",
      "Universal",
      "Variável",
      "Incompleto",
      "Temporário"
    ],
    resposta: 1,
    explicacao: "O código genético é universal, ou seja, o mesmo códon codifica o mesmo aminoácido em praticamente todos os seres vivos.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Biologia Molecular"
  },
  {
    id: 109,
    materia: "Biologia",
    enunciado: "A hemoglobina é responsável por:",
    alternativas: [
      "Coagulação do sangue",
      "Transporte de oxigênio",
      "Defesa do organismo",
      "Produção de energia",
      "Digestão de proteínas"
    ],
    resposta: 1,
    explicacao: "A hemoglobina é uma proteína presente nos glóbulos vermelhos que transporta oxigênio dos pulmões para os tecidos.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Fisiologia"
  },
  {
    id: 110,
    materia: "Biologia",
    enunciado: "A reprodução sexuada é vantajosa porque:",
    alternativas: [
      "É mais rápida",
      "Gera variabilidade genética",
      "Requer menos energia",
      "Produz mais descendentes",
      "É mais simples"
    ],
    resposta: 1,
    explicacao: "A reprodução sexuada gera variabilidade genética através da recombinação, aumentando as chances de sobrevivência da espécie.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Reprodução"
  },
  {
    id: 111,
    materia: "Biologia",
    enunciado: "Os hormônios são produzidos por:",
    alternativas: [
      "Sistema nervoso",
      "Glândulas endócrinas",
      "Sistema digestório",
      "Sistema respiratório",
      "Sistema excretor"
    ],
    resposta: 1,
    explicacao: "Os hormônios são produzidos pelas glândulas endócrinas e transportados pelo sangue até seus órgãos-alvo.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Endocrinologia"
  },
  {
    id: 112,
    materia: "Biologia",
    enunciado: "A fermentação é um processo:",
    alternativas: [
      "Aeróbico",
      "Anaeróbico",
      "Fotossintético",
      "Digestivo",
      "Reprodutivo"
    ],
    resposta: 1,
    explicacao: "A fermentação é um processo anaeróbico (sem oxigênio) de obtenção de energia, comum em leveduras e bactérias.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Metabolismo"
  },
  {
    id: 113,
    materia: "Biologia",
    enunciado: "O sistema excretor humano tem como órgão principal:",
    alternativas: [
      "Fígado",
      "Rins",
      "Pulmões",
      "Pele",
      "Intestinos"
    ],
    resposta: 1,
    explicacao: "Os rins são os principais órgãos do sistema excretor, filtrando o sangue e produzindo urina.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Fisiologia"
  },
  {
    id: 114,
    materia: "Biologia",
    enunciado: "A biodiversidade refere-se à:",
    alternativas: [
      "Quantidade de indivíduos",
      "Variedade de seres vivos",
      "Tamanho dos ecossistemas",
      "Velocidade de reprodução",
      "Longevidade das espécies"
    ],
    resposta: 1,
    explicacao: "Biodiversidade é a variedade de seres vivos em todos os níveis: genético, de espécies e de ecossistemas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Ecologia"
  },
  {
    id: 115,
    materia: "Biologia",
    enunciado: "A cadeia alimentar representa:",
    alternativas: [
      "Competição entre espécies",
      "Fluxo de energia nos ecossistemas",
      "Migração de animais",
      "Reprodução das plantas",
      "Ciclo da água"
    ],
    resposta: 1,
    explicacao: "A cadeia alimentar mostra como a energia flui através dos diferentes níveis tróficos em um ecossistema.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Ecologia"
  },
  {
    id: 116,
    materia: "Biologia",
    enunciado: "As mutações são:",
    alternativas: [
      "Sempre prejudiciais",
      "Alterações no material genético",
      "Apenas benéficas",
      "Impossíveis de ocorrer",
      "Controláveis pelo organismo"
    ],
    resposta: 1,
    explicacao: "Mutações são alterações no material genético que podem ser neutras, benéficas ou prejudiciais para o organismo.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Genética"
  },
  {
    id: 117,
    materia: "Biologia",
    enunciado: "O processo de osmose envolve:",
    alternativas: [
      "Movimento de solutos",
      "Movimento de solvente",
      "Produção de energia",
      "Síntese de proteínas",
      "Divisão celular"
    ],
    resposta: 1,
    explicacao: "Osmose é o movimento de solvente (geralmente água) através de uma membrana semipermeável.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Fisiologia Celular"
  },
  {
    id: 118,
    materia: "Biologia",
    enunciado: "Os fungos são:",
    alternativas: [
      "Autótrofos",
      "Heterótrofos",
      "Fotossintéticos",
      "Quimiossintéticos",
      "Parasitas obrigatórios"
    ],
    resposta: 1,
    explicacao: "Os fungos são heterótrofos, obtendo energia através da decomposição de matéria orgânica ou parasitismo.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Reino Fungi"
  },
  {
    id: 119,
    materia: "Biologia",
    enunciado: "A insulina é produzida:",
    alternativas: [
      "No fígado",
      "No pâncreas",
      "Nos rins",
      "Na tireoide",
      "Nas suprarrenais"
    ],
    resposta: 1,
    explicacao: "A insulina é produzida pelas células beta das ilhotas de Langerhans no pâncreas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Endocrinologia"
  },
  {
    id: 120,
    materia: "Biologia",
    enunciado: "A seleção natural atua sobre:",
    alternativas: [
      "Genótipos",
      "Fenótipos",
      "Cromossomos",
      "Genes isolados",
      "Mutações"
    ],
    resposta: 1,
    explicacao: "A seleção natural atua sobre os fenótipos (características observáveis), favorecendo os mais adaptados ao ambiente.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Evolução"
  },

  // QUÍMICA (30 questões)
  {
    id: 121,
    materia: "Química",
    enunciado: "Qual é a massa molar aproximada do ácido sulfúrico (H₂SO₄)? Dados: H=1, S=32, O=16",
    alternativas: ["82 g/mol", "98 g/mol", "114 g/mol", "130 g/mol", "146 g/mol"],
    resposta: 1,
    explicacao: "H₂SO₄: (2×1) + (1×32) + (4×16) = 2 + 32 + 64 = 98 g/mol",
    dificuldade: "Média",
    pontos: 15,
    tema: "Cálculos Químicos"
  },
  {
    id: 122,
    materia: "Química",
    enunciado: "O número de oxidação do cloro no composto HClO₃ é:",
    alternativas: ["-1", "+1", "+3", "+5", "+7"],
    resposta: 3,
    explicacao: "No HClO₃: H(+1) + Cl(x) + 3O(-2) = 0, então +1 + x - 6 = 0, logo x = +5",
    dificuldade: "Média",
    pontos: 15,
    tema: "Oxidação"
  },
  {
    id: 123,
    materia: "Química",
    enunciado: "Qual é a configuração eletrônica do íon Ca²⁺? (Z do Ca = 20)",
    alternativas: [
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
      "1s² 2s² 2p⁶ 3s² 3p⁶",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
      "1s² 2s² 2p⁶ 3s² 3p⁵",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 3d²"
    ],
    resposta: 1,
    explicacao: "O Ca tem 20 elétrons. O Ca²⁺ perdeu 2 elétrons (os do 4s²), ficando com 18 elétrons: 1s² 2s² 2p⁶ 3s² 3p⁶",
    dificuldade: "Média",
    pontos: 15,
    tema: "Estrutura Atômica"
  },
  {
    id: 124,
    materia: "Química",
    enunciado: "O pH de uma solução com [H⁺] = 10⁻³ M é:",
    alternativas: ["3", "11", "-3", "7", "14"],
    resposta: 0,
    explicacao: "pH = -log[H⁺] = -log(10⁻³) = -(-3) = 3",
    dificuldade: "Média",
    pontos: 15,
    tema: "Equilíbrio Químico"
  },
  {
    id: 125,
    materia: "Química",
    enunciado: "A fórmula molecular da glicose é:",
    alternativas: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "C₂H₆O", "C₃H₈O₃", "C₆H₆"],
    resposta: 0,
    explicacao: "A glicose é um monossacarídeo com fórmula molecular C₆H₁₂O₆.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Química Orgânica"
  },
  {
    id: 126,
    materia: "Química",
    enunciado: "Quantos mols de átomos há em 12g de carbono-12?",
    alternativas: ["0,5 mol", "1 mol", "2 mols", "6 mols", "12 mols"],
    resposta: 1,
    explicacao: "12g de C-12 correspondem exatamente a 1 mol de átomos de carbono (massa atômica = 12 u).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Cálculos Químicos"
  },
  {
    id: 127,
    materia: "Química",
    enunciado: "A ligação entre Na⁺ e Cl⁻ no NaCl é:",
    alternativas: ["Covalente", "Iônica", "Metálica", "Van der Waals", "Dipolo-dipolo"],
    resposta: 1,
    explicacao: "A ligação entre íons de cargas opostas (Na⁺ e Cl⁻) é uma ligação iônica.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Ligações Químicas"
  },
  {
    id: 128,
    materia: "Química",
    enunciado: "A reação 2H₂ + O₂ → 2H₂O é uma reação de:",
    alternativas: ["Decomposição", "Síntese", "Simples troca", "Dupla troca", "Neutralização"],
    resposta: 1,
    explicacao: "É uma reação de síntese (ou composição), pois duas substâncias simples formam uma composta.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Reações Químicas"
  },
  {
    id: 129,
    materia: "Química",
    enunciado: "O elemento com configuração eletrônica 1s² 2s² 2p⁶ 3s¹ é:",
    alternativas: ["Lítio", "Sódio", "Potássio", "Magnésio", "Alumínio"],
    resposta: 1,
    explicacao: "A configuração 1s² 2s² 2p⁶ 3s¹ corresponde a 11 elétrons, que é o sódio (Na, Z=11).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Estrutura Atômica"
  },
  {
    id: 130,
    materia: "Química",
    enunciado: "A pressão de 2 atm equivale a quantos mmHg?",
    alternativas: ["760 mmHg", "1520 mmHg", "380 mmHg", "1000 mmHg", "2000 mmHg"],
    resposta: 1,
    explicacao: "1 atm = 760 mmHg, então 2 atm = 2 × 760 = 1520 mmHg",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Gases"
  },
  {
    id: 131,
    materia: "Química",
    enunciado: "A geometria molecular do metano (CH₄) é:",
    alternativas: ["Linear", "Angular", "Trigonal plana", "Tetraédrica", "Octaédrica"],
    resposta: 3,
    explicacao: "O metano tem 4 ligações simples ao redor do carbono, resultando em geometria tetraédrica.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geometria Molecular"
  },
  {
    id: 132,
    materia: "Química",
    enunciado: "O número de Avogadro é aproximadamente:",
    alternativas: ["6,02 × 10²³", "6,02 × 10²²", "6,02 × 10²⁴", "3,01 × 10²³", "1,20 × 10²³"],
    resposta: 0,
    explicacao: "O número de Avogadro é 6,02 × 10²³, representando o número de partículas em 1 mol.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Cálculos Químicos"
  },
  {
    id: 133,
    materia: "Química",
    enunciado: "A solubilidade do NaCl em água é devida:",
    alternativas: [
      "À polaridade da água",
      "À temperatura",
      "À pressão",
      "Ao pH",
      "À concentração"
    ],
    resposta: 0,
    explicacao: "A água, sendo polar, consegue solubilizar compostos iônicos como o NaCl através de interações íon-dipolo.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Soluções"
  },
  {
    id: 134,
    materia: "Química",
    enunciado: "A fórmula do ácido nítrico é:",
    alternativas: ["HNO₂", "HNO₃", "H₂NO₃", "HN₂O₃", "H₃NO₃"],
    resposta: 1,
    explicacao: "O ácido nítrico tem fórmula HNO₃, sendo um ácido forte e oxidante.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Ácidos e Bases"
  },
  {
    id: 135,
    materia: "Química",
    enunciado: "Em uma reação endotérmica:",
    alternativas: [
      "Há liberação de calor",
      "Há absorção de calor",
      "A temperatura não muda",
      "Não há troca de energia",
      "Há liberação de luz"
    ],
    resposta: 1,
    explicacao: "Reações endotérmicas absorvem calor do meio ambiente, resultando em ΔH > 0.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Termoquímica"
  },
  {
    id: 136,
    materia: "Química",
    enunciado: "O principal componente do ar atmosférico é:",
    alternativas: ["Oxigênio", "Nitrogênio", "Argônio", "Dióxido de carbono", "Vapor d'água"],
    resposta: 1,
    explicacao: "O nitrogênio (N₂) representa cerca de 78% da composição do ar atmosférico.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Química Ambiental"
  },
  {
    id: 137,
    materia: "Química",
    enunciado: "A eletrólise da água produz:",
    alternativas: [
      "H₂ e O₂",
      "H₂ e O₃",
      "H₂O₂ e O₂",
      "H⁺ e OH⁻",
      "H₂SO₄ e O₂"
    ],
    resposta: 0,
    explicacao: "A eletrólise da água (2H₂O → 2H₂ + O₂) produz hidrogênio gasoso e oxigênio gasoso.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Eletroquímica"
  },
  {
    id: 138,
    materia: "Química",
    enunciado: "A fórmula do hidróxido de sódio é:",
    alternativas: ["NaOH", "Na₂OH", "NaOH₂", "Na(OH)₂", "NaH"],
    resposta: 0,
    explicacao: "O hidróxido de sódio tem fórmula NaOH, sendo uma base forte muito utilizada industrialmente.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Ácidos e Bases"
  },
  {
    id: 139,
    materia: "Química",
    enunciado: "O isótopo mais comum do carbono tem:",
    alternativas: ["6 prótons e 6 nêutrons", "6 prótons e 8 nêutrons", "8 prótons e 6 nêutrons", "12 prótons e 6 nêutrons", "6 prótons e 12 nêutrons"],
    resposta: 0,
    explicacao: "O carbono-12 (¹²C) tem 6 prótons e 6 nêutrons, sendo o isótopo mais abundante.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Estrutura Atômica"
  },
  {
    id: 140,
    materia: "Química",
    enunciado: "A velocidade de uma reação química pode ser aumentada por:",
    alternativas: [
      "Diminuição da temperatura",
      "Uso de catalisador",
      "Diminuição da concentração",
      "Aumento da pressão em gases",
      "Todas as anteriores"
    ],
    resposta: 1,
    explicacao: "Catalisadores aumentam a velocidade da reação diminuindo a energia de ativação necessária.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Cinética Química"
  },
  {
    id: 141,
    materia: "Química",
    enunciado: "O benzeno (C₆H₆) é um:",
    alternativas: [
      "Alcano",
      "Alceno",
      "Alcino",
      "Hidrocarboneto aromático",
      "Álcool"
    ],
    resposta: 3,
    explicacao: "O benzeno é um hidrocarboneto aromático, caracterizado pelo anel benzênico com ligações ressonantes.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Química Orgânica"
  },
  {
    id: 142,
    materia: "Química",
    enunciado: "A massa atômica do cloro é aproximadamente 35,5 u porque:",
    alternativas: [
      "Tem 35,5 prótons",
      "É a média ponderada dos isótopos",
      "Tem 35,5 nêutrons",
      "É um erro de medição",
      "Tem massa fracionária"
    ],
    resposta: 1,
    explicacao: "A massa atômica é a média ponderada das massas dos isótopos naturais (Cl-35 e Cl-37).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Estrutura Atômica"
  },
  {
    id: 143,
    materia: "Química",
    enunciado: "A fórmula do sulfato de cálcio é:",
    alternativas: ["CaSO₃", "CaSO₄", "Ca₂SO₄", "CaS", "Ca(SO₄)₂"],
    resposta: 1,
    explicacao: "O sulfato de cálcio tem fórmula CaSO₄, formado pelo íon Ca²⁺ e o íon SO₄²⁻.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Nomenclatura"
  },
  {
    id: 144,
    materia: "Química",
    enunciado: "O ponto de ebulição da água ao nível do mar é:",
    alternativas: ["90°C", "95°C", "100°C", "105°C", "110°C"],
    resposta: 2,
    explicacao: "A água ferve a 100°C ao nível do mar (pressão de 1 atm), sendo um ponto de referência importante.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Propriedades da Matéria"
  },
  {
    id: 145,
    materia: "Química",
    enunciado: "A pilha de Daniell utiliza os metais:",
    alternativas: [
      "Zinco e cobre",
      "Ferro e cobre",
      "Zinco e prata",
      "Cobre e prata",
      "Ferro e zinco"
    ],
    resposta: 0,
    explicacao: "A pilha de Daniell é formada por eletrodos de zinco (ânodo) e cobre (cátodo) em soluções de seus sais.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Eletroquímica"
  },
  {
    id: 146,
    materia: "Química",
    enunciado: "O gás nobre do segundo período da tabela periódica é:",
    alternativas: ["Hélio", "Neônio", "Argônio", "Criptônio", "Xenônio"],
    resposta: 1,
    explicacao: "O neônio (Ne) é o gás nobre localizado no segundo período da tabela periódica.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Tabela Periódica"
  },
  {
    id: 147,
    materia: "Química",
    enunciado: "A combustão completa do metano produz:",
    alternativas: [
      "CO e H₂O",
      "CO₂ e H₂O",
      "C e H₂O",
      "CO₂ e H₂",
      "C e H₂"
    ],
    resposta: 1,
    explicacao: "A combustão completa do metano: CH₄ + 2O₂ → CO₂ + 2H₂O",
    dificuldade: "Média",
    pontos: 15,
    tema: "Reações Químicas"
  },
  {
    id: 148,
    materia: "Química",
    enunciado: "A constante de Avogadro relaciona:",
    alternativas: [
      "Massa e volume",
      "Número de partículas e mols",
      "Pressão e temperatura",
      "Energia e temperatura",
      "Volume e temperatura"
    ],
    resposta: 1,
    explicacao: "A constante de Avogadro (6,02×10²³) relaciona o número de partículas com a quantidade em mols.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Cálculos Químicos"
  },
  {
    id: 149,
    materia: "Química",
    enunciado: "O principal gás responsável pelo efeito estufa é:",
    alternativas: ["O₂", "N₂", "CO₂", "H₂", "He"],
    resposta: 2,
    explicacao: "O dióxido de carbono (CO₂) é o principal gás responsável pelo efeito estufa antropogênico.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Química Ambiental"
  },
  {
    id: 150,
    materia: "Química",
    enunciado: "A fórmula do ácido clorídrico é:",
    alternativas: ["HCl", "HClO", "HClO₂", "HClO₃", "HClO₄"],
    resposta: 0,
    explicacao: "O ácido clorídrico tem fórmula HCl, sendo um ácido forte muito utilizado industrialmente.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Ácidos e Bases"
  },

  // FÍSICA (30 questões)
  {
    id: 151,
    materia: "Física",
    enunciado: "Um corpo em movimento retilíneo uniforme percorre 120 m em 8 s. Sua velocidade é:",
    alternativas: ["10 m/s", "15 m/s", "20 m/s", "25 m/s", "30 m/s"],
    resposta: 1,
    explicacao: "Velocidade = distância/tempo = 120m/8s = 15 m/s",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Cinemática"
  },
  {
    id: 152,
    materia: "Física",
    enunciado: "A energia cinética de um corpo de massa 2 kg que se move a 10 m/s é:",
    alternativas: ["50 J", "100 J", "150 J", "200 J", "250 J"],
    resposta: 1,
    explicacao: "Ec = mv²/2 = 2×(10)²/2 = 2×100/2 = 100 J",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Energia"
  },
  {
    id: 153,
    materia: "Física",
    enunciado: "Duas cargas elétricas de +2μC e +3μC estão separadas por 30 cm no vácuo. A força entre elas é: (k = 9×10⁹ N⋅m²/C²)",
    alternativas: ["0,3 N", "0,6 N", "0,9 N", "1,2 N", "1,8 N"],
    resposta: 1,
    explicacao: "F = k×q₁×q₂/d² = 9×10⁹×2×10⁻⁶×3×10⁻⁶/(0,3)² = 54×10⁻³/0,09 = 0,6 N",
    dificuldade: "Difícil",
    pontos: 25,
    tema: "Eletrostática"
  },
  {
    id: 154,
    materia: "Física",
    enunciado: "A aceleração da gravidade na Terra é aproximadamente:",
    alternativas: ["8,8 m/s²", "9,8 m/s²", "10,8 m/s²", "11,8 m/s²", "12,8 m/s²"],
    resposta: 1,
    explicacao: "A aceleração da gravidade na superfície terrestre é aproximadamente 9,8 m/s².",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Gravitação"
  },
  {
    id: 155,
    materia: "Física",
    enunciado: "A velocidade da luz no vácuo é:",
    alternativas: ["3×10⁶ m/s", "3×10⁷ m/s", "3×10⁸ m/s", "3×10⁹ m/s", "3×10¹⁰ m/s"],
    resposta: 2,
    explicacao: "A velocidade da luz no vácuo é uma constante universal: c = 3×10⁸ m/s.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Óptica"
  },
  {
    id: 156,
    materia: "Física",
    enunciado: "A primeira lei de Newton estabelece que:",
    alternativas: [
      "F = ma",
      "Todo corpo em repouso tende a permanecer em repouso",
      "Ação e reação são iguais e opostas",
      "A energia se conserva",
      "A massa se conserva"
    ],
    resposta: 1,
    explicacao: "A primeira lei de Newton (lei da inércia) estabelece que um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a permanecer em movimento retilíneo uniforme, a menos que uma força atue sobre ele.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Mecânica"
  },
  {
    id: 157,
    materia: "Física",
    enunciado: "A potência elétrica é dada por:",
    alternativas: ["P = V/I", "P = VI", "P = V + I", "P = V - I", "P = I/V"],
    resposta: 1,
    explicacao: "A potência elétrica é o produto da tensão pela corrente: P = VI (em watts).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Eletricidade"
  },
  {
    id: 158,
    materia: "Física",
    enunciado: "O período de um pêndulo simples depende principalmente:",
    alternativas: [
      "Da massa",
      "Do comprimento",
      "Da amplitude",
      "Da velocidade inicial",
      "Da força aplicada"
    ],
    resposta: 1,
    explicacao: "O período de um pêndulo simples depende principalmente do seu comprimento e da aceleração da gravidade: T = 2π√(L/g).",
    dificuldade: "Média",
    pontos: 15,
    tema: "Oscilações"
  },
  {
    id: 159,
    materia: "Física",
    enunciado: "A frequência de uma onda é:",
    alternativas: [
      "O número de oscilações por segundo",
      "A distância entre duas cristas",
      "A velocidade da onda",
      "A amplitude máxima",
      "O tempo de uma oscilação"
    ],
    resposta: 0,
    explicacao: "A frequência é o número de oscilações (ou ciclos) que ocorrem por unidade de tempo, medida em hertz (Hz).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Ondulatória"
  },
  {
    id: 160,
    materia: "Física",
    enunciado: "A lei de Ohm estabelece que:",
    alternativas: ["V = I/R", "V = IR", "V = I + R", "V = I - R", "V = R/I"],
    resposta: 1,
    explicacao: "A lei de Ohm estabelece que a tensão é igual ao produto da corrente pela resistência: V = IR.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Eletricidade"
  },
  {
    id: 161,
    materia: "Física",
    enunciado: "A temperatura de 0°C corresponde a quantos Kelvin?",
    alternativas: ["0 K", "273 K", "373 K", "100 K", "200 K"],
    resposta: 1,
    explicacao: "A conversão é: K = °C + 273, então 0°C = 0 + 273 = 273 K.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Termologia"
  },
  {
    id: 162,
    materia: "Física",
    enunciado: "A pressão atmosférica ao nível do mar é aproximadamente:",
    alternativas: ["1 atm", "2 atm", "0,5 atm", "1,5 atm", "3 atm"],
    resposta: 0,
    explicacao: "A pressão atmosférica padrão ao nível do mar é 1 atm = 101.325 Pa = 760 mmHg.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Hidrostática"
  },
  {
    id: 163,
    materia: "Física",
    enunciado: "O trabalho realizado por uma força de 10 N que desloca um objeto por 5 m é:",
    alternativas: ["2 J", "15 J", "50 J", "100 J", "500 J"],
    resposta: 2,
    explicacao: "Trabalho = Força × deslocamento = 10 N × 5 m = 50 J.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Energia"
  },
  {
    id: 164,
    materia: "Física",
    enunciado: "A segunda lei de Newton é expressa por:",
    alternativas: ["F = ma", "F = mv", "F = m/a", "F = a/m", "F = m + a"],
    resposta: 0,
    explicacao: "A segunda lei de Newton estabelece que a força resultante é igual ao produto da massa pela aceleração: F = ma.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Mecânica"
  },
  {
    id: 165,
    materia: "Física",
    enunciado: "A unidade de medida da corrente elétrica no SI é:",
    alternativas: ["Volt", "Ampère", "Ohm", "Watt", "Coulomb"],
    resposta: 1,
    explicacao: "A corrente elétrica é medida em ampères (A) no Sistema Internacional de Unidades.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Eletricidade"
  },
  {
    id: 166,
    materia: "Física",
    enunciado: "O comprimento de onda é:",
    alternativas: [
      "A distância entre duas cristas consecutivas",
      "O número de oscilações por segundo",
      "A velocidade da onda",
      "A amplitude máxima",
      "O período da onda"
    ],
    resposta: 0,
    explicacao: "O comprimento de onda (λ) é a distância entre dois pontos consecutivos em fase, como duas cristas ou dois vales.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Ondulatória"
  },
  {
    id: 167,
    materia: "Física",
    enunciado: "A energia potencial gravitacional de um objeto depende:",
    alternativas: [
      "Apenas da massa",
      "Apenas da altura",
      "Da massa e da altura",
      "Apenas da velocidade",
      "Da massa e da velocidade"
    ],
    resposta: 2,
    explicacao: "A energia potencial gravitacional é dada por Ep = mgh, dependendo da massa, da aceleração da gravidade e da altura.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Energia"
  },
  {
    id: 168,
    materia: "Física",
    enunciado: "O calor específico da água é aproximadamente:",
    alternativas: ["1 cal/g°C", "2 cal/g°C", "0,5 cal/g°C", "4 cal/g°C", "10 cal/g°C"],
    resposta: 0,
    explicacao: "O calor específico da água é 1 cal/g°C ou 4,18 J/g°C, sendo usado como referência.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Termologia"
  },
  {
    id: 169,
    materia: "Física",
    enunciado: "A força centrípeta em movimento circular é:",
    alternativas: [
      "Dirigida para fora do centro",
      "Dirigida para o centro",
      "Tangente à trajetória",
      "Perpendicular ao plano",
      "Nula"
    ],
    resposta: 1,
    explicacao: "A força centrípeta é sempre dirigida para o centro da trajetória circular, mantendo o objeto em movimento circular.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Mecânica"
  },
  {
    id: 170,
    materia: "Física",
    enunciado: "A resistência elétrica de um fio depende:",
    alternativas: [
      "Apenas do material",
      "Do material e do comprimento",
      "Do material, comprimento e área da seção",
      "Apenas da corrente",
      "Apenas da tensão"
    ],
    resposta: 2,
    explicacao: "A resistência depende da resistividade do material (ρ), do comprimento (L) e da área da seção transversal (A): R = ρL/A.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Eletricidade"
  },
  {
    id: 171,
    materia: "Física",
    enunciado: "O efeito Doppler ocorre quando:",
    alternativas: [
      "A fonte e o observador estão em repouso",
      "Há movimento relativo entre fonte e observador",
      "A onda é refletida",
      "A onda é refratada",
      "A amplitude varia"
    ],
    resposta: 1,
    explicacao: "O efeito Doppler é a variação da frequência observada quando há movimento relativo entre a fonte sonora e o observador.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Ondulatória"
  },
  {
    id: 172,
    materia: "Física",
    enunciado: "A dilatação térmica linear é dada por:",
    alternativas: ["ΔL = L₀αΔT", "ΔL = L₀/αΔT", "ΔL = L₀α/ΔT", "ΔL = L₀ΔT/α", "ΔL = αΔT"],
    resposta: 0,
    explicacao: "A dilatação linear é ΔL = L₀αΔT, onde L₀ é o comprimento inicial, α é o coeficiente de dilatação e ΔT é a variação de temperatura.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Termologia"
  },
  {
    id: 173,
    materia: "Física",
    enunciado: "A intensidade do campo elétrico é medida em:",
    alternativas: ["N", "C", "N/C", "C/N", "V"],
    resposta: 2,
    explicacao: "A intensidade do campo elétrico é medida em newtons por coulomb (N/C) ou volts por metro (V/m).",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Eletrostática"
  },
  {
    id: 174,
    materia: "Física",
    enunciado: "O princípio da conservação da energia estabelece que:",
    alternativas: [
      "A energia pode ser criada",
      "A energia pode ser destruída",
      "A energia total se conserva",
      "A energia sempre aumenta",
      "A energia sempre diminui"
    ],
    resposta: 2,
    explicacao: "O princípio da conservação da energia estabelece que a energia total de um sistema isolado permanece constante.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Energia"
  },
  {
    id: 175,
    materia: "Física",
    enunciado: "A refração da luz ocorre quando:",
    alternativas: [
      "A luz muda de meio",
      "A luz é absorvida",
      "A luz é emitida",
      "A luz para",
      "A luz acelera"
    ],
    resposta: 0,
    explicacao: "A refração ocorre quando a luz passa de um meio para outro com índice de refração diferente, mudando sua direção.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Óptica"
  },
  {
    id: 176,
    materia: "Física",
    enunciado: "A unidade de medida da força no SI é:",
    alternativas: ["Joule", "Newton", "Pascal", "Watt", "Ampère"],
    resposta: 1,
    explicacao: "A força é medida em newtons (N) no Sistema Internacional de Unidades.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Mecânica"
  },
  {
    id: 177,
    materia: "Física",
    enunciado: "O movimento harmônico simples é caracterizado por:",
    alternativas: [
      "Velocidade constante",
      "Aceleração constante",
      "Força proporcional ao deslocamento",
      "Força constante",
      "Ausência de força"
    ],
    resposta: 2,
    explicacao: "No movimento harmônico simples, a força restauradora é proporcional ao deslocamento e dirigida para a posição de equilíbrio.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Oscilações"
  },
  {
    id: 178,
    materia: "Física",
    enunciado: "A capacitância de um capacitor é medida em:",
    alternativas: ["Farad", "Henry", "Ohm", "Volt", "Ampère"],
    resposta: 0,
    explicacao: "A capacitância é medida em farads (F), que representa a capacidade de armazenar carga elétrica.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Eletricidade"
  },
  {
    id: 179,
    materia: "Física",
    enunciado: "A terceira lei de Newton estabelece que:",
    alternativas: [
      "F = ma",
      "Todo corpo em repouso permanece em repouso",
      "Para toda ação há uma reação igual e oposta",
      "A energia se conserva",
      "A velocidade é constante"
    ],
    resposta: 2,
    explicacao: "A terceira lei de Newton (ação e reação) estabelece que para toda força aplicada há uma força de reação igual em módulo e direção, mas de sentido oposto.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Mecânica"
  },
  {
    id: 180,
    materia: "Física",
    enunciado: "A pressão é definida como:",
    alternativas: [
      "Força por área",
      "Força por volume",
      "Área por força",
      "Volume por força",
      "Força por tempo"
    ],
    resposta: 0,
    explicacao: "A pressão é definida como a força aplicada perpendicularmente sobre uma área: P = F/A.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Hidrostática"
  },

  // GEOGRAFIA (30 questões)
  {
    id: 181,
    materia: "Geografia",
    enunciado: "O clima tropical semi-árido brasileiro é caracterizado por:",
    alternativas: [
      "Chuvas abundantes o ano todo",
      "Baixas temperaturas e geadas",
      "Chuvas escassas e irregulares",
      "Neve no inverno",
      "Umidade elevada constante"
    ],
    resposta: 2,
    explicacao: "O clima semi-árido é caracterizado por precipitações escassas e irregulares, típico do sertão nordestino.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Climatologia"
  },
  {
    id: 182,
    materia: "Geografia",
    enunciado: "A Região Concentrada do Brasil engloba principalmente:",
    alternativas: [
      "Norte e Nordeste",
      "Sul e Sudeste", 
      "Centro-Oeste e Norte",
      "Nordeste e Centro-Oeste",
      "Apenas o Sudeste"
    ],
    resposta: 1,
    explicacao: "A Região Concentrada abrange principalmente o Sul e Sudeste, onde se concentra a maior parte da população e atividade econômica do país.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geografia do Brasil"
  },
  {
    id: 183,
    materia: "Geografia",
    enunciado: "O maior bioma brasileiro em extensão é:",
    alternativas: ["Mata Atlântica", "Cerrado", "Amazônia", "Caatinga", "Pantanal"],
    resposta: 2,
    explicacao: "A Amazônia é o maior bioma brasileiro, ocupando cerca de 49% do território nacional.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Biogeografia"
  },
  {
    id: 184,
    materia: "Geografia",
    enunciado: "A linha do Equador passa por qual região brasileira?",
    alternativas: ["Nordeste", "Norte", "Centro-Oeste", "Sudeste", "Sul"],
    resposta: 1,
    explicacao: "A linha do Equador passa pela região Norte do Brasil, atravessando estados como Roraima, Pará e Amazonas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geografia Física"
  },
  {
    id: 185,
    materia: "Geografia",
    enunciado: "O fenômeno El Niño provoca no Brasil:",
    alternativas: [
      "Secas no Nordeste e chuvas no Sul",
      "Chuvas no Nordeste e secas no Sul",
      "Chuvas em todo o país",
      "Secas em todo o país",
      "Não afeta o Brasil"
    ],
    resposta: 0,
    explicacao: "O El Niño geralmente causa secas no Nordeste e chuvas intensas na região Sul do Brasil.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Climatologia"
  },
  {
    id: 186,
    materia: "Geografia",
    enunciado: "A maior bacia hidrográfica do mundo é:",
    alternativas: ["Bacia do Nilo", "Bacia Amazônica", "Bacia do Mississippi", "Bacia do Congo", "Bacia do Ganges"],
    resposta: 1,
    explicacao: "A Bacia Amazônica é a maior bacia hidrográfica do mundo, drenando cerca de 7 milhões de km².",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Hidrografia"
  },
  {
    id: 187,
    materia: "Geografia",
    enunciado: "O processo de urbanização no Brasil intensificou-se a partir de:",
    alternativas: ["1930", "1940", "1950", "1960", "1970"],
    resposta: 2,
    explicacao: "A urbanização brasileira intensificou-se a partir dos anos 1950, com o processo de industrialização e êxodo rural.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geografia Urbana"
  },
  {
    id: 188,
    materia: "Geografia",
    enunciado: "A Cordilheira dos Andes localiza-se:",
    alternativas: [
      "Na América do Norte",
      "Na América Central",
      "Na América do Sul",
      "Na Europa",
      "Na Ásia"
    ],
    resposta: 2,
    explicacao: "A Cordilheira dos Andes estende-se ao longo da costa oeste da América do Sul.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geografia Física"
  },
  {
    id: 189,
    materia: "Geografia",
    enunciado: "O agronegócio brasileiro destaca-se na produção de:",
    alternativas: [
      "Soja e milho",
      "Trigo e aveia",
      "Arroz e feijão",
      "Café e cacau",
      "Algodão e fumo"
    ],
    resposta: 0,
    explicacao: "O Brasil é um dos maiores produtores mundiais de soja e milho, commodities importantes do agronegócio.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geografia Econômica"
  },
  {
    id: 190,
    materia: "Geografia",
    enunciado: "A população brasileira concentra-se principalmente:",
    alternativas: [
      "No interior",
      "Na faixa litorânea",
      "Na região amazônica",
      "Na fronteira com outros países",
      "Uniformemente distribuída"
    ],
    resposta: 1,
    explicacao: "A população brasileira concentra-se principalmente na faixa litorânea, especialmente no litoral atlântico.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Demografia"
  },
  {
    id: 191,
    materia: "Geografia",
    enunciado: "O Trópico de Capricórnio passa por qual estado brasileiro?",
    alternativas: ["Bahia", "Minas Gerais", "São Paulo", "Rio de Janeiro", "Paraná"],
    resposta: 2,
    explicacao: "O Trópico de Capricórnio passa pelo estado de São Paulo, próximo à cidade de São Paulo.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geografia Física"
  },
  {
    id: 192,
    materia: "Geografia",
    enunciado: "A transição demográfica no Brasil caracteriza-se por:",
    alternativas: [
      "Alta natalidade e alta mortalidade",
      "Baixa natalidade e baixa mortalidade",
      "Alta natalidade e baixa mortalidade",
      "Baixa natalidade e alta mortalidade",
      "Natalidade e mortalidade constantes"
    ],
    resposta: 1,
    explicacao: "O Brasil está na fase de transição demográfica com baixa natalidade e baixa mortalidade, resultando em envelhecimento populacional.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Demografia"
  },
  {
    id: 193,
    materia: "Geografia",
    enunciado: "O maior deserto do mundo é:",
    alternativas: ["Saara", "Gobi", "Atacama", "Antártica", "Kalahari"],
    resposta: 3,
    explicacao: "A Antártica é tecnicamente o maior deserto do mundo, sendo um deserto frio com precipitação muito baixa.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geografia Física"
  },
  {
    id: 194,
    materia: "Geografia",
    enunciado: "A Mata Atlântica originalmente cobria:",
    alternativas: [
      "Toda a região Norte",
      "A faixa litorânea brasileira",
      "O interior do Nordeste",
      "A região Centro-Oeste",
      "Apenas o estado de São Paulo"
    ],
    resposta: 1,
    explicacao: "A Mata Atlântica originalmente cobria grande parte da faixa litorânea brasileira, do Rio Grande do Norte ao Rio Grande do Sul.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Biogeografia"
  },
  {
    id: 195,
    materia: "Geografia",
    enunciado: "O movimento de rotação da Terra dura:",
    alternativas: ["12 horas", "24 horas", "365 dias", "30 dias", "7 dias"],
    resposta: 1,
    explicacao: "O movimento de rotação da Terra em torno de seu eixo dura aproximadamente 24 horas, determinando o dia e a noite.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Astronomia"
  },
  {
    id: 196,
    materia: "Geografia",
    enunciado: "A principal causa do aquecimento global é:",
    alternativas: [
      "Atividade solar",
      "Emissão de gases do efeito estufa",
      "Desmatamento apenas",
      "Atividade vulcânica",
      "Mudanças na órbita terrestre"
    ],
    resposta: 1,
    explicacao: "A principal causa do aquecimento global atual é a emissão de gases do efeito estufa pelas atividades humanas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Climatologia"
  },
  {
    id: 197,
    materia: "Geografia",
    enunciado: "O MERCOSUL é:",
    alternativas: [
      "Um bloco econômico sul-americano",
      "Uma organização militar",
      "Um tratado ambiental",
      "Uma moeda comum",
      "Um acordo cultural"
    ],
    resposta: 0,
    explicacao: "O MERCOSUL (Mercado Comum do Sul) é um bloco econômico formado por países sul-americanos para integração comercial.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geopolítica"
  },
  {
    id: 198,
    materia: "Geografia",
    enunciado: "A camada da atmosfera onde ocorrem os fenômenos meteorológicos é:",
    alternativas: ["Estratosfera", "Troposfera", "Mesosfera", "Termosfera", "Exosfera"],
    resposta: 1,
    explicacao: "A troposfera é a camada mais baixa da atmosfera, onde ocorrem os fenômenos meteorológicos como chuva, vento e tempestades.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Climatologia"
  },
  {
    id: 199,
    materia: "Geografia",
    enunciado: "O maior país da América do Sul em extensão territorial é:",
    alternativas: ["Argentina", "Brasil", "Peru", "Colômbia", "Venezuela"],
    resposta: 1,
    explicacao: "O Brasil é o maior país da América do Sul, ocupando cerca de 47% do território sul-americano.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geografia Política"
  },
  {
    id: 200,
    materia: "Geografia",
    enunciado: "A escala cartográfica 1:100.000 significa que:",
    alternativas: [
      "1 cm no mapa = 100.000 cm na realidade",
      "1 cm no mapa = 1.000 m na realidade",
      "1 cm no mapa = 100 m na realidade",
      "1 cm no mapa = 10 km na realidade",
      "1 cm no mapa = 100 km na realidade"
    ],
    resposta: 0,
    explicacao: "Na escala 1:100.000, cada 1 cm no mapa corresponde a 100.000 cm (ou 1 km) na realidade.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Cartografia"
  },
  {
    id: 201,
    materia: "Geografia",
    enunciado: "O processo de desertificação é causado principalmente por:",
    alternativas: [
      "Chuvas excessivas",
      "Atividades humanas inadequadas",
      "Terremotos",
      "Atividade vulcânica",
      "Marés altas"
    ],
    resposta: 1,
    explicacao: "A desertificação é causada principalmente por atividades humanas inadequadas como desmatamento, sobrepastoreio e agricultura intensiva.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geografia Ambiental"
  },
  {
    id: 202,
    materia: "Geografia",
    enunciado: "A Chapada Diamantina localiza-se no estado:",
    alternativas: ["Minas Gerais", "Bahia", "Goiás", "Mato Grosso", "Tocantins"],
    resposta: 1,
    explicacao: "A Chapada Diamantina é uma região montanhosa localizada no centro do estado da Bahia.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geografia do Brasil"
  },
  {
    id: 203,
    materia: "Geografia",
    enunciado: "O movimento de translação da Terra resulta em:",
    alternativas: [
      "Dia e noite",
      "Estações do ano",
      "Marés",
      "Fusos horários",
      "Ventos"
    ],
    resposta: 1,
    explicacao: "O movimento de translação da Terra ao redor do Sol, combinado com a inclinação do eixo terrestre, resulta nas estações do ano.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Astronomia"
  },
  {
    id: 204,
    materia: "Geografia",
    enunciado: "A principal fonte de energia renovável no Brasil é:",
    alternativas: ["Solar", "Eólica", "Hidrelétrica", "Biomassa", "Geotérmica"],
    resposta: 2,
    explicacao: "A energia hidrelétrica é a principal fonte de energia renovável no Brasil, aproveitando o potencial hídrico do país.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geografia Econômica"
  },
  {
    id: 205,
    materia: "Geografia",
    enunciado: "O Pantanal é considerado:",
    alternativas: [
      "A maior planície alagável do mundo",
      "O maior deserto do Brasil",
      "A maior floresta tropical",
      "A maior cordilheira",
      "O maior lago"
    ],
    resposta: 0,
    explicacao: "O Pantanal é considerado a maior planície alagável do mundo, localizado principalmente no Mato Grosso e Mato Grosso do Sul.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Biogeografia"
  },
  {
    id: 206,
    materia: "Geografia",
    enunciado: "A megalópole brasileira localiza-se:",
    alternativas: [
      "Entre São Paulo e Rio de Janeiro",
      "Entre Brasília e Goiânia",
      "Entre Salvador e Recife",
      "Entre Porto Alegre e Curitiba",
      "Entre Manaus e Belém"
    ],
    resposta: 0,
    explicacao: "A megalópole brasileira forma-se no eixo São Paulo-Rio de Janeiro, concentrando grande população e atividade econômica.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geografia Urbana"
  },
  {
    id: 207,
    materia: "Geografia",
    enunciado: "O clima equatorial é caracterizado por:",
    alternativas: [
      "Baixas temperaturas e secas",
      "Altas temperaturas e chuvas abundantes",
      "Temperaturas amenas e chuvas escassas",
      "Grandes variações térmicas",
      "Presença de neve"
    ],
    resposta: 1,
    explicacao: "O clima equatorial caracteriza-se por altas temperaturas durante todo o ano e chuvas abundantes e bem distribuídas.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Climatologia"
  },
  {
    id: 208,
    materia: "Geografia",
    enunciado: "A Bacia do São Francisco é conhecida como:",
    alternativas: [
      "Rio da Integração Nacional",
      "Rio das Velhas",
      "Rio da Unidade Nacional",
      "Rio do Desenvolvimento",
      "Rio da Esperança"
    ],
    resposta: 0,
    explicacao: "O Rio São Francisco é conhecido como 'Rio da Integração Nacional' por atravessar várias regiões e estados brasileiros.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Hidrografia"
  },
  {
    id: 209,
    materia: "Geografia",
    enunciado: "A principal característica do relevo brasileiro é:",
    alternativas: [
      "Predomínio de montanhas",
      "Predomínio de planícies",
      "Predomínio de planaltos",
      "Predomínio de depressões",
      "Relevo uniforme"
    ],
    resposta: 2,
    explicacao: "O relevo brasileiro caracteriza-se pelo predomínio de planaltos, que ocupam a maior parte do território nacional.",
    dificuldade: "Média",
    pontos: 15,
    tema: "Geomorfologia"
  },
  {
    id: 210,
    materia: "Geografia",
    enunciado: "O maior produtor mundial de café é:",
    alternativas: ["Colômbia", "Brasil", "Vietnã", "Etiópia", "Guatemala"],
    resposta: 1,
    explicacao: "O Brasil é o maior produtor mundial de café, responsável por cerca de um terço da produção global.",
    dificuldade: "Fácil",
    pontos: 10,
    tema: "Geografia Econômica"
  }
]

const materias = ["Todas", "Matemática", "Português", "História", "Biologia", "Química", "Física", "Geografia"]

// Sistema de conquistas expandido
const conquistas = [
  { id: 1, nome: "Primeiro Passo", descricao: "Responda sua primeira questão", icone: "🎯", desbloqueada: false, pontos: 5 },
  { id: 2, nome: "Sequência de Ouro", descricao: "Acerte 5 questões seguidas", icone: "🔥", desbloqueada: false, pontos: 20 },
  { id: 3, nome: "Matemático", descricao: "Acerte 10 questões de Matemática", icone: "🧮", desbloqueada: false, pontos: 30 },
  { id: 4, nome: "Poliglota", descricao: "Acerte 10 questões de Português", icone: "📚", desbloqueada: false, pontos: 30 },
  { id: 5, nome: "Historiador", descricao: "Acerte 10 questões de História", icone: "🏛️", desbloqueada: false, pontos: 30 },
  { id: 6, nome: "Cientista", descricao: "Acerte questões de todas as ciências", icone: "🔬", desbloqueada: false, pontos: 50 },
  { id: 7, nome: "Velocista", descricao: "Responda uma questão em menos de 30s", icone: "⚡", desbloqueada: false, pontos: 15 },
  { id: 8, nome: "Maratonista", descricao: "Responda 50 questões", icone: "🏃", desbloqueada: false, pontos: 100 },
  { id: 9, nome: "Perfeccionista", descricao: "Tenha 90% de aproveitamento", icone: "💎", desbloqueada: false, pontos: 75 },
  { id: 10, nome: "Lenda", descricao: "Alcance 1000 pontos", icone: "👑", desbloqueada: false, pontos: 200 },
  { id: 11, nome: "Físico", descricao: "Acerte 10 questões de Física", icone: "⚛️", desbloqueada: false, pontos: 30 },
  { id: 12, nome: "Químico", descricao: "Acerte 10 questões de Química", icone: "🧪", desbloqueada: false, pontos: 30 },
  { id: 13, nome: "Biólogo", descricao: "Acerte 10 questões de Biologia", icone: "🧬", desbloqueada: false, pontos: 30 },
  { id: 14, nome: "Geógrafo", descricao: "Acerte 10 questões de Geografia", icone: "🌍", desbloqueada: false, pontos: 30 },
  { id: 15, nome: "Especialista", descricao: "Acerte 20 questões de uma matéria", icone: "🎓", desbloqueada: false, pontos: 60 },
  { id: 16, nome: "Centurião", descricao: "Responda 100 questões", icone: "💯", desbloqueada: false, pontos: 150 },
  { id: 17, nome: "Mestre", descricao: "Alcance 2000 pontos", icone: "🏆", desbloqueada: false, pontos: 300 },
  { id: 18, nome: "Imortal", descricao: "Sequência de 10 acertos", icone: "⭐", desbloqueada: false, pontos: 100 }
]

// Níveis do sistema expandidos
const niveis = [
  { nivel: 1, nome: "Iniciante", minPontos: 0, maxPontos: 99, cor: "gray" },
  { nivel: 2, nome: "Estudante", minPontos: 100, maxPontos: 299, cor: "blue" },
  { nivel: 3, nome: "Dedicado", minPontos: 300, maxPontos: 599, cor: "green" },
  { nivel: 4, nome: "Expert", minPontos: 600, maxPontos: 999, cor: "purple" },
  { nivel: 5, nome: "Mestre", minPontos: 1000, maxPontos: 1999, cor: "orange" },
  { nivel: 6, nome: "Lenda", minPontos: 2000, maxPontos: 3999, cor: "red" },
  { nivel: 7, nome: "Imortal", minPontos: 4000, maxPontos: Infinity, cor: "gold" }
]

export default function EnemApp() {
  // Estados principais
  const [questaoAtual, setQuestaoAtual] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null)
  const [mostrarResposta, setMostrarResposta] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)
  const [questoesRespondidas, setQuestoesRespondidas] = useState(0)
  const [materiaFiltro, setMateriaFiltro] = useState("Todas")
  const [modoSimulado, setModoSimulado] = useState(false)
  const [tempoRestante, setTempoRestante] = useState(300)
  const [simuladoIniciado, setSimuladoIniciado] = useState(false)
  
  // Estados de gamificação
  const [pontosTotais, setPontosTotais] = useState(0)
  const [streak, setStreak] = useState(0)
  const [melhorStreak, setMelhorStreak] = useState(0)
  const [conquistasDesbloqueadas, setConquistasDesbloqueadas] = useState<number[]>([])
  const [showConquista, setShowConquista] = useState<any>(null)
  const [acertosPorMateria, setAcertosPorMateria] = useState<{[key: string]: number}>({})
  const [tempoInicioQuestao, setTempoInicioQuestao] = useState(Date.now())
  const [animacaoResposta, setAnimacaoResposta] = useState<'correct' | 'incorrect' | null>(null)
  const [somAtivado, setSomAtivado] = useState(true)
  const [modoDesafio, setModoDesafio] = useState(false)
  const [vidasRestantes, setVidasRestantes] = useState(3)
  const [multiplicadorPontos, setMultiplicadorPontos] = useState(1)

  // Calcular nível atual
  const nivelAtual = niveis.find(n => pontosTotais >= n.minPontos && pontosTotais <= n.maxPontos) || niveis[0]
  const proximoNivel = niveis.find(n => n.nivel === nivelAtual.nivel + 1)
  const progressoNivel = proximoNivel 
    ? ((pontosTotais - nivelAtual.minPontos) / (proximoNivel.minPontos - nivelAtual.minPontos)) * 100
    : 100

  // Timer para simulado
  useEffect(() => {
    if (modoSimulado && simuladoIniciado && tempoRestante > 0 && !mostrarResposta) {
      const timer = setTimeout(() => {
        setTempoRestante(tempoRestante - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (tempoRestante === 0 && !mostrarResposta) {
      proximaQuestao()
    }
  }, [tempoRestante, modoSimulado, simuladoIniciado, mostrarResposta])

  // Inicializar tempo da questão
  useEffect(() => {
    setTempoInicioQuestao(Date.now())
  }, [questaoAtual])

  const questoesFiltradas = materiaFiltro === "Todas" 
    ? questoesEnem 
    : questoesEnem.filter(q => q.materia === materiaFiltro)

  const questao = questoesFiltradas[questaoAtual] || questoesEnem[0]

  // Função para tocar som (simulado)
  const tocarSom = (tipo: 'correct' | 'incorrect' | 'level-up' | 'achievement') => {
    if (!somAtivado) return
    // Aqui você poderia integrar com Web Audio API para sons reais
    console.log(`🔊 Som: ${tipo}`)
  }

  // Verificar conquistas expandido
  const verificarConquistas = (acertou: boolean, tempoResposta: number) => {
    const novasConquistas: number[] = []

    // Primeira questão
    if (questoesRespondidas === 0 && !conquistasDesbloqueadas.includes(1)) {
      novasConquistas.push(1)
    }

    // Sequência de ouro (5 acertos seguidos)
    if (streak >= 5 && !conquistasDesbloqueadas.includes(2)) {
      novasConquistas.push(2)
    }

    // Sequência imortal (10 acertos seguidos)
    if (streak >= 10 && !conquistasDesbloqueadas.includes(18)) {
      novasConquistas.push(18)
    }

    // Conquistas por matéria
    if (acertou) {
      const novosAcertos = { ...acertosPorMateria }
      novosAcertos[questao.materia] = (novosAcertos[questao.materia] || 0) + 1
      setAcertosPorMateria(novosAcertos)

      // Conquistas específicas por matéria (10 acertos)
      if (novosAcertos["Matemática"] >= 10 && !conquistasDesbloqueadas.includes(3)) {
        novasConquistas.push(3)
      }
      if (novosAcertos["Português"] >= 10 && !conquistasDesbloqueadas.includes(4)) {
        novasConquistas.push(4)
      }
      if (novosAcertos["História"] >= 10 && !conquistasDesbloqueadas.includes(5)) {
        novasConquistas.push(5)
      }
      if (novosAcertos["Física"] >= 10 && !conquistasDesbloqueadas.includes(11)) {
        novasConquistas.push(11)
      }
      if (novosAcertos["Química"] >= 10 && !conquistasDesbloqueadas.includes(12)) {
        novasConquistas.push(12)
      }
      if (novosAcertos["Biologia"] >= 10 && !conquistasDesbloqueadas.includes(13)) {
        novasConquistas.push(13)
      }
      if (novosAcertos["Geografia"] >= 10 && !conquistasDesbloqueadas.includes(14)) {
        novasConquistas.push(14)
      }

      // Especialista (20 acertos em uma matéria)
      const maxAcertos = Math.max(...Object.values(novosAcertos))
      if (maxAcertos >= 20 && !conquistasDesbloqueadas.includes(15)) {
        novasConquistas.push(15)
      }

      // Cientista (acertar questões de todas as ciências)
      const ciencias = ["Física", "Química", "Biologia"]
      const acertouTodasCiencias = ciencias.every(c => novosAcertos[c] > 0)
      if (acertouTodasCiencias && !conquistasDesbloqueadas.includes(6)) {
        novasConquistas.push(6)
      }
    }

    // Velocista (menos de 30s)
    if (acertou && tempoResposta < 30000 && !conquistasDesbloqueadas.includes(7)) {
      novasConquistas.push(7)
    }

    // Maratonista (50 questões)
    if (questoesRespondidas >= 49 && !conquistasDesbloqueadas.includes(8)) {
      novasConquistas.push(8)
    }

    // Centurião (100 questões)
    if (questoesRespondidas >= 99 && !conquistasDesbloqueadas.includes(16)) {
      novasConquistas.push(16)
    }

    // Perfeccionista (90% aproveitamento)
    const aproveitamento = questoesRespondidas > 0 ? (pontuacao / questoesRespondidas) * 100 : 0
    if (aproveitamento >= 90 && questoesRespondidas >= 10 && !conquistasDesbloqueadas.includes(9)) {
      novasConquistas.push(9)
    }

    // Lenda (1000 pontos)
    if (pontosTotais >= 1000 && !conquistasDesbloqueadas.includes(10)) {
      novasConquistas.push(10)
    }

    // Mestre (2000 pontos)
    if (pontosTotais >= 2000 && !conquistasDesbloqueadas.includes(17)) {
      novasConquistas.push(17)
    }

    // Processar novas conquistas
    if (novasConquistas.length > 0) {
      setConquistasDesbloqueadas(prev => [...prev, ...novasConquistas])
      const conquista = conquistas.find(c => c.id === novasConquistas[0])
      if (conquista) {
        setShowConquista(conquista)
        tocarSom('achievement')
        setTimeout(() => setShowConquista(null), 4000)
      }
    }
  }

  const responder = (alternativa: number) => {
    if (mostrarResposta) return
    
    const tempoResposta = Date.now() - tempoInicioQuestao
    const acertou = alternativa === questao.resposta
    
    setRespostaSelecionada(alternativa)
    setMostrarResposta(true)
    setQuestoesRespondidas(prev => prev + 1)
    
    // Animação de resposta
    setAnimacaoResposta(acertou ? 'correct' : 'incorrect')
    setTimeout(() => setAnimacaoResposta(null), 1000)
    
    if (acertou) {
      const pontosGanhos = questao.pontos * multiplicadorPontos
      setPontuacao(prev => prev + 1)
      setPontosTotais(prev => prev + pontosGanhos)
      setStreak(prev => {
        const novoStreak = prev + 1
        if (novoStreak > melhorStreak) {
          setMelhorStreak(novoStreak)
        }
        return novoStreak
      })
      tocarSom('correct')
      
      // Aumentar multiplicador a cada 3 acertos seguidos
      if ((streak + 1) % 3 === 0) {
        setMultiplicadorPontos(prev => Math.min(prev + 0.5, 3))
      }
    } else {
      setStreak(0)
      setMultiplicadorPontos(1)
      tocarSom('incorrect')
      
      // Modo desafio: perder vida
      if (modoDesafio) {
        setVidasRestantes(prev => prev - 1)
      }
    }
    
    verificarConquistas(acertou, tempoResposta)
  }

  const proximaQuestao = () => {
    const proximoIndice = (questaoAtual + 1) % questoesFiltradas.length
    setQuestaoAtual(proximoIndice)
    setRespostaSelecionada(null)
    setMostrarResposta(false)
    setTempoRestante(300)
  }

  const reiniciarQuiz = () => {
    setQuestaoAtual(0)
    setRespostaSelecionada(null)
    setMostrarResposta(false)
    setPontuacao(0)
    setQuestoesRespondidas(0)
    setTempoRestante(300)
    setSimuladoIniciado(false)
    setStreak(0)
    setMultiplicadorPontos(1)
    if (modoDesafio) {
      setVidasRestantes(3)
    }
  }

  const iniciarSimulado = () => {
    setModoSimulado(true)
    setSimuladoIniciado(true)
    reiniciarQuiz()
  }

  const iniciarDesafio = () => {
    setModoDesafio(true)
    setVidasRestantes(3)
    reiniciarQuiz()
  }

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60)
    const secs = segundos % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const porcentagemAcerto = questoesRespondidas > 0 ? Math.round((pontuacao / questoesRespondidas) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Notificação de conquista */}
      {showConquista && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-2xl shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{showConquista.icone}</div>
            <div>
              <div className="font-bold">🎉 Conquista Desbloqueada!</div>
              <div className="text-sm">{showConquista.nome}</div>
              <div className="text-xs opacity-90">+{showConquista.pontos} pontos</div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Gamificado */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl shadow-2xl">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                EnemPrep Pro
              </h1>
              <p className="text-xl text-gray-300 mt-2">
                🚀 Sua jornada épica rumo ao ENEM! Agora com 210+ questões!
              </p>
            </div>
          </div>

          {/* Barra de Status do Jogador */}
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{pontosTotais}</div>
                <div className="text-sm text-gray-300">Pontos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{streak}</div>
                <div className="text-sm text-gray-300">Sequência</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{nivelAtual.nivel}</div>
                <div className="text-sm text-gray-300">{nivelAtual.nome}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{conquistasDesbloqueadas.length}</div>
                <div className="text-sm text-gray-300">Conquistas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{multiplicadorPontos}x</div>
                <div className="text-sm text-gray-300">Multiplicador</div>
              </div>
            </div>
            
            {/* Barra de Progresso do Nível */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Nível {nivelAtual.nivel} - {nivelAtual.nome}</span>
                <span>{proximoNivel ? `${pontosTotais}/${proximoNivel.minPontos}` : 'MAX'}</span>
              </div>
              <Progress value={progressoNivel} className="h-3 bg-gray-700" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="questoes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] lg:mx-auto bg-black/20 backdrop-blur-sm border border-white/10">
            <TabsTrigger value="questoes" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
              <Brain className="w-4 h-4" />
              Questões
            </TabsTrigger>
            <TabsTrigger value="simulado" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
              <Clock className="w-4 h-4" />
              Simulado
            </TabsTrigger>
            <TabsTrigger value="desafio" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500">
              <Swords className="w-4 h-4" />
              Desafio
            </TabsTrigger>
            <TabsTrigger value="progresso" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500">
              <Trophy className="w-4 h-4" />
              Progresso
            </TabsTrigger>
          </TabsList>

          {/* Aba de Questões */}
          <TabsContent value="questoes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Painel Lateral */}
              <Card className="lg:col-span-1 bg-black/20 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Controles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Filtro de Matéria */}
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-300">Matéria</label>
                    <select 
                      value={materiaFiltro}
                      onChange={(e) => {
                        setMateriaFiltro(e.target.value)
                        setQuestaoAtual(0)
                        setMostrarResposta(false)
                        setRespostaSelecionada(null)
                      }}
                      className="w-full p-3 border rounded-xl bg-black/30 text-white border-white/20 focus:border-blue-400"
                    >
                      {materias.map(materia => (
                        <option key={materia} value={materia} className="bg-gray-800">{materia}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Atual */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span className="font-medium">Sequência: {streak}</span>
                    </div>
                    
                    {multiplicadorPontos > 1 && (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Zap className="w-5 h-5" />
                        <span className="font-medium">Multiplicador {multiplicadorPontos}x Ativo!</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-3 text-white">
                        <BarChart3 className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium">Progresso</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Acertos</span>
                          <span className="font-medium text-green-400">{pontuacao}/{questoesRespondidas}</span>
                        </div>
                        <Progress value={porcentagemAcerto} className="h-2" />
                        <div className="text-center text-sm text-gray-300">
                          {porcentagemAcerto}% de aproveitamento
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Controles de Som */}
                  <div className="pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSomAtivado(!somAtivado)}
                      className="w-full bg-black/30 border-white/20 text-white hover:bg-white/10"
                    >
                      {somAtivado ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
                      {somAtivado ? 'Som Ativado' : 'Som Desativado'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Questão Principal */}
              <Card className={`lg:col-span-3 bg-black/20 backdrop-blur-sm border-white/10 transition-all duration-500 ${
                animacaoResposta === 'correct' ? 'ring-4 ring-green-400 bg-green-500/10' :
                animacaoResposta === 'incorrect' ? 'ring-4 ring-red-400 bg-red-500/10' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={`text-sm bg-gradient-to-r ${
                        questao.materia === 'Matemática' ? 'from-blue-500 to-blue-600' :
                        questao.materia === 'Português' ? 'from-green-500 to-green-600' :
                        questao.materia === 'História' ? 'from-yellow-500 to-yellow-600' :
                        questao.materia === 'Biologia' ? 'from-emerald-500 to-emerald-600' :
                        questao.materia === 'Química' ? 'from-purple-500 to-purple-600' :
                        questao.materia === 'Física' ? 'from-red-500 to-red-600' :
                        questao.materia === 'Geografia' ? 'from-teal-500 to-teal-600' :
                        'from-gray-500 to-gray-600'
                      } text-white border-0`}>
                        {questao.materia}
                      </Badge>
                      <Badge 
                        variant={questao.dificuldade === 'Fácil' ? 'default' : questao.dificuldade === 'Média' ? 'secondary' : 'destructive'}
                        className="text-sm"
                      >
                        {questao.dificuldade} • {questao.pontos}pts
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      Questão {questaoAtual + 1} de {questoesFiltradas.length}
                    </div>
                  </div>
                  {questao.tema && (
                    <div className="text-sm text-gray-400">
                      📚 {questao.tema}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-lg leading-relaxed text-white">
                    {questao.enunciado}
                  </div>

                  <div className="space-y-3">
                    {questao.alternativas.map((alternativa, index) => (
                      <button
                        key={index}
                        onClick={() => responder(index)}
                        disabled={mostrarResposta}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
                          mostrarResposta
                            ? index === questao.resposta
                              ? 'border-green-400 bg-green-500/20 text-green-100 shadow-lg shadow-green-500/25'
                              : index === respostaSelecionada && index !== questao.resposta
                              ? 'border-red-400 bg-red-500/20 text-red-100 shadow-lg shadow-red-500/25'
                              : 'border-white/10 bg-black/20 text-gray-300'
                            : respostaSelecionada === index
                            ? 'border-blue-400 bg-blue-500/20 text-blue-100 shadow-lg shadow-blue-500/25'
                            : 'border-white/20 hover:border-blue-300 hover:bg-blue-500/10 text-white hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                            mostrarResposta && index === questao.resposta
                              ? 'border-green-400 bg-green-400 text-white shadow-lg'
                              : mostrarResposta && index === respostaSelecionada && index !== questao.resposta
                              ? 'border-red-400 bg-red-400 text-white shadow-lg'
                              : respostaSelecionada === index
                              ? 'border-blue-400 bg-blue-400 text-white'
                              : 'border-gray-400 text-gray-400'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="flex-1">{alternativa}</span>
                          {mostrarResposta && index === questao.resposta && (
                            <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
                          )}
                          {mostrarResposta && index === respostaSelecionada && index !== questao.resposta && (
                            <XCircle className="w-6 h-6 text-red-400 animate-pulse" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {mostrarResposta && (
                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/20 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <BookOpen className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                            💡 Explicação
                            {respostaSelecionada === questao.resposta && (
                              <span className="text-green-400 text-sm">+{questao.pontos * multiplicadorPontos} pontos!</span>
                            )}
                          </h4>
                          <p className="text-blue-100 leading-relaxed">
                            {questao.explicacao}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={proximaQuestao}
                      disabled={!mostrarResposta}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Próxima Questão
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={reiniciarQuiz}
                      className="bg-black/30 border-white/20 text-white hover:bg-white/10 rounded-xl"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reiniciar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba de Simulado */}
          <TabsContent value="simulado" className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5" />
                  Modo Simulado ENEM
                </CardTitle>
                <CardDescription className="text-gray-300">
                  🎯 Pratique com tempo limitado como no ENEM real - 5 minutos por questão
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!modoSimulado ? (
                  <div className="text-center space-y-8">
                    <div className="p-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl border border-orange-400/20 backdrop-blur-sm">
                      <Trophy className="w-20 h-20 text-orange-400 mx-auto mb-6 animate-bounce" />
                      <h3 className="text-3xl font-bold text-white mb-4">
                        🏆 Simulado ENEM
                      </h3>
                      <p className="text-gray-300 mb-8 text-lg">
                        Teste seus conhecimentos com tempo limitado e pressão real da prova!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-black/30 rounded-2xl">
                          <Timer className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                          <div className="text-white font-bold">5 min</div>
                          <div className="text-gray-400 text-sm">por questão</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-2xl">
                          <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                          <div className="text-white font-bold">210+</div>
                          <div className="text-gray-400 text-sm">questões</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-2xl">
                          <Medal className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <div className="text-white font-bold">Ranking</div>
                          <div className="text-gray-400 text-sm">competitivo</div>
                        </div>
                      </div>
                      <Button 
                        onClick={iniciarSimulado}
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-orange-500/25 transition-all transform hover:scale-105"
                      >
                        <Play className="w-6 h-6 mr-3" />
                        Iniciar Simulado Épico
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Timer Dramático */}
                    <div className="flex items-center justify-center gap-6 p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-400/30">
                      <Clock className="w-8 h-8 text-orange-400 animate-pulse" />
                      <div className="text-center">
                        <div className={`text-4xl font-bold transition-colors ${
                          tempoRestante <= 60 ? 'text-red-400 animate-pulse' : 
                          tempoRestante <= 120 ? 'text-orange-400' : 'text-green-400'
                        }`}>
                          {formatarTempo(tempoRestante)}
                        </div>
                        <div className="text-sm text-gray-300 mt-1">
                          ⏰ Tempo restante
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{questaoAtual + 1}</div>
                        <div className="text-sm text-gray-300">de {questoesFiltradas.length}</div>
                      </div>
                    </div>

                    {/* Questão do Simulado */}
                    <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            {questao.materia}
                          </Badge>
                          <div className="text-sm text-gray-400">
                            🎯 Simulado ENEM
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-lg leading-relaxed text-white">
                          {questao.enunciado}
                        </div>

                        <div className="space-y-3">
                          {questao.alternativas.map((alternativa, index) => (
                            <button
                              key={index}
                              onClick={() => responder(index)}
                              disabled={mostrarResposta}
                              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                                mostrarResposta
                                  ? index === questao.resposta
                                    ? 'border-green-400 bg-green-500/20 text-green-100'
                                    : index === respostaSelecionada && index !== questao.resposta
                                    ? 'border-red-400 bg-red-500/20 text-red-100'
                                    : 'border-white/10 bg-black/20 text-gray-300'
                                  : respostaSelecionada === index
                                  ? 'border-orange-400 bg-orange-500/20 text-orange-100'
                                  : 'border-white/20 hover:border-orange-300 hover:bg-orange-500/10 text-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                                  mostrarResposta && index === questao.resposta
                                    ? 'border-green-400 bg-green-400 text-white'
                                    : mostrarResposta && index === respostaSelecionada && index !== questao.resposta
                                    ? 'border-red-400 bg-red-400 text-white'
                                    : 'border-gray-400 text-gray-400'
                                }`}>
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <span>{alternativa}</span>
                              </div>
                            </button>
                          ))}
                        </div>

                        {mostrarResposta && (
                          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
                            <div className="flex items-start gap-2">
                              <BookOpen className="w-4 h-4 text-blue-400 mt-1" />
                              <div>
                                <h4 className="font-medium text-blue-300 mb-1">💡 Explicação</h4>
                                <p className="text-blue-100 text-sm leading-relaxed">
                                  {questao.explicacao}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-4">
                          <Button 
                            onClick={proximaQuestao}
                            disabled={!mostrarResposta}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          >
                            Próxima Questão
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setModoSimulado(false)
                              reiniciarQuiz()
                            }}
                            className="bg-black/30 border-white/20 text-white hover:bg-white/10"
                          >
                            Sair do Simulado
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Desafio */}
          <TabsContent value="desafio" className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Swords className="w-5 h-5" />
                  Modo Desafio Extremo
                </CardTitle>
                <CardDescription className="text-gray-300">
                  ⚔️ Apenas 3 vidas! Cada erro conta. Você tem coragem?
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!modoDesafio ? (
                  <div className="text-center space-y-8">
                    <div className="p-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl border border-red-400/20 backdrop-blur-sm">
                      <Shield className="w-20 h-20 text-red-400 mx-auto mb-6 animate-pulse" />
                      <h3 className="text-3xl font-bold text-white mb-4">
                        ⚔️ Desafio Extremo
                      </h3>
                      <p className="text-gray-300 mb-8 text-lg">
                        Apenas os mais corajosos sobrevivem! Você tem apenas 3 vidas.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-black/30 rounded-2xl">
                          <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                          <div className="text-white font-bold">3 Vidas</div>
                          <div className="text-gray-400 text-sm">apenas</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-2xl">
                          <Gem className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <div className="text-white font-bold">2x</div>
                          <div className="text-gray-400 text-sm">pontos</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-2xl">
                          <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                          <div className="text-white font-bold">Glória</div>
                          <div className="text-gray-400 text-sm">eterna</div>
                        </div>
                      </div>
                      <Button 
                        onClick={iniciarDesafio}
                        size="lg"
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all transform hover:scale-105"
                      >
                        <Swords className="w-6 h-6 mr-3" />
                        Aceitar o Desafio
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Vidas Restantes */}
                    <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl">
                      <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                          <Heart 
                            key={i} 
                            className={`w-8 h-8 ${
                              i < vidasRestantes ? 'text-red-400 fill-red-400' : 'text-gray-600'
                            } transition-all`} 
                          />
                        ))}
                      </div>
                      <div className="text-white font-bold">
                        {vidasRestantes > 0 ? `${vidasRestantes} vidas restantes` : 'Game Over!'}
                      </div>
                    </div>

                    {vidasRestantes > 0 ? (
                      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                              {questao.materia} • DESAFIO
                            </Badge>
                            <div className="text-sm text-gray-400">
                              ⚔️ Modo Extremo
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="text-lg leading-relaxed text-white">
                            {questao.enunciado}
                          </div>

                          <div className="space-y-3">
                            {questao.alternativas.map((alternativa, index) => (
                              <button
                                key={index}
                                onClick={() => responder(index)}
                                disabled={mostrarResposta}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                                  mostrarResposta
                                    ? index === questao.resposta
                                      ? 'border-green-400 bg-green-500/20 text-green-100'
                                      : index === respostaSelecionada && index !== questao.resposta
                                      ? 'border-red-400 bg-red-500/20 text-red-100'
                                      : 'border-white/10 bg-black/20 text-gray-300'
                                    : respostaSelecionada === index
                                    ? 'border-red-400 bg-red-500/20 text-red-100'
                                    : 'border-white/20 hover:border-red-300 hover:bg-red-500/10 text-white'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                                    mostrarResposta && index === questao.resposta
                                      ? 'border-green-400 bg-green-400 text-white'
                                      : mostrarResposta && index === respostaSelecionada && index !== questao.resposta
                                      ? 'border-red-400 bg-red-400 text-white'
                                      : 'border-gray-400 text-gray-400'
                                  }`}>
                                    {String.fromCharCode(65 + index)}
                                  </div>
                                  <span>{alternativa}</span>
                                </div>
                              </button>
                            ))}
                          </div>

                          {mostrarResposta && (
                            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
                              <div className="flex items-start gap-2">
                                <BookOpen className="w-4 h-4 text-blue-400 mt-1" />
                                <div>
                                  <h4 className="font-medium text-blue-300 mb-1">💡 Explicação</h4>
                                  <p className="text-blue-100 text-sm leading-relaxed">
                                    {questao.explicacao}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-3 pt-4">
                            <Button 
                              onClick={proximaQuestao}
                              disabled={!mostrarResposta}
                              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                            >
                              Próxima Questão
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setModoDesafio(false)
                                reiniciarQuiz()
                              }}
                              className="bg-black/30 border-white/20 text-white hover:bg-white/10"
                            >
                              Desistir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="text-center space-y-6">
                        <div className="p-8 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-3xl">
                          <XCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
                          <p className="text-gray-300 mb-6">
                            Você sobreviveu a {questoesRespondidas} questões no modo extremo!
                          </p>
                          <Button 
                            onClick={() => {
                              setModoDesafio(false)
                              reiniciarQuiz()
                            }}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            Tentar Novamente
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Progresso */}
          <TabsContent value="progresso" className="space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-2xl">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400">{pontuacao}</div>
                      <div className="text-sm text-gray-300">Acertos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/20 rounded-2xl">
                      <Target className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-400">{questoesRespondidas}</div>
                      <div className="text-sm text-gray-300">Questões</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-500/20 rounded-2xl">
                      <Flame className="w-8 h-8 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-400">{melhorStreak}</div>
                      <div className="text-sm text-gray-300">Melhor Sequência</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/20 rounded-2xl">
                      <Star className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-400">{porcentagemAcerto}%</div>
                      <div className="text-sm text-gray-300">Aproveitamento</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conquistas Expandidas */}
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  🏆 Conquistas ({conquistasDesbloqueadas.length}/{conquistas.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {conquistas.map((conquista) => {
                    const desbloqueada = conquistasDesbloqueadas.includes(conquista.id)
                    return (
                      <div
                        key={conquista.id}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          desbloqueada
                            ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 shadow-lg shadow-yellow-500/10'
                            : 'bg-black/30 border-gray-600/30'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`text-2xl ${desbloqueada ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                            {conquista.icone}
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold ${desbloqueada ? 'text-yellow-400' : 'text-gray-500'}`}>
                              {conquista.nome}
                            </div>
                            <div className={`text-sm ${desbloqueada ? 'text-yellow-300' : 'text-gray-600'}`}>
                              +{conquista.pontos} pontos
                            </div>
                          </div>
                          {desbloqueada && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <div className={`text-sm ${desbloqueada ? 'text-gray-300' : 'text-gray-600'}`}>
                          {conquista.descricao}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Desempenho por Matéria Expandido */}
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">📊 Desempenho por Matéria</CardTitle>
                <CardDescription className="text-gray-300">
                  Veja como você está se saindo em cada área do conhecimento (210+ questões disponíveis!)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["Matemática", "Português", "História", "Biologia", "Química", "Física", "Geografia"].map((materia) => {
                    const questoesDaMateria = questoesEnem.filter(q => q.materia === materia).length
                    const acertosDaMateria = acertosPorMateria[materia] || 0
                    const porcentagem = questoesDaMateria > 0 ? Math.round((acertosDaMateria / questoesDaMateria) * 100) : 0
                    
                    return (
                      <div key={materia} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${
                              materia === 'Matemática' ? 'bg-blue-400' :
                              materia === 'Português' ? 'bg-green-400' :
                              materia === 'História' ? 'bg-yellow-400' :
                              materia === 'Biologia' ? 'bg-emerald-400' :
                              materia === 'Química' ? 'bg-purple-400' :
                              materia === 'Física' ? 'bg-red-400' :
                              'bg-teal-400'
                            }`}></div>
                            <span className="font-medium text-white">{materia}</span>
                            <span className="text-xs text-gray-400">({questoesDaMateria} questões)</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-300">
                              {acertosDaMateria}/{questoesDaMateria}
                            </span>
                            <div className={`text-lg font-bold ${
                              porcentagem >= 80 ? 'text-green-400' :
                              porcentagem >= 60 ? 'text-yellow-400' :
                              porcentagem >= 40 ? 'text-orange-400' : 'text-red-400'
                            }`}>
                              {porcentagem}%
                            </div>
                          </div>
                        </div>
                        <Progress value={porcentagem} className="h-3" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Dicas Gamificadas Expandidas */}
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">💡 Dicas para Dominar o ENEM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-400/20">
                    <h4 className="font-bold text-blue-300 mb-3 flex items-center gap-2">
                      🎯 Mantenha a Sequência
                    </h4>
                    <p className="text-blue-100 text-sm leading-relaxed mb-3">
                      Acerte questões consecutivas para ativar multiplicadores de pontos e conquistar badges especiais!
                    </p>
                    <div className="text-xs text-blue-200 bg-blue-500/10 p-2 rounded">
                      💡 Dica: A cada 3 acertos seguidos, seu multiplicador aumenta!
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-400/20">
                    <h4 className="font-bold text-green-300 mb-3 flex items-center gap-2">
                      ⚡ Responda Rapidamente
                    </h4>
                    <p className="text-green-100 text-sm leading-relaxed mb-3">
                      Questões respondidas em menos de 30 segundos desbloqueiam a conquista "Velocista"!
                    </p>
                    <div className="text-xs text-green-200 bg-green-500/10 p-2 rounded">
                      💡 Dica: Use o modo simulado para treinar velocidade!
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-400/20">
                    <h4 className="font-bold text-purple-300 mb-3 flex items-center gap-2">
                      🔬 Diversifique as Matérias
                    </h4>
                    <p className="text-purple-100 text-sm leading-relaxed mb-3">
                      Acerte questões de todas as matérias para desbloquear conquistas especiais e bônus de XP!
                    </p>
                    <div className="text-xs text-purple-200 bg-purple-500/10 p-2 rounded">
                      💡 Dica: Agora temos 30+ questões em cada matéria!
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-400/20">
                    <h4 className="font-bold text-orange-300 mb-3 flex items-center gap-2">
                      ⚔️ Aceite os Desafios
                    </h4>
                    <p className="text-orange-100 text-sm leading-relaxed mb-3">
                      O modo desafio oferece pontos em dobro, mas cuidado: você só tem 3 vidas!
                    </p>
                    <div className="text-xs text-orange-200 bg-orange-500/10 p-2 rounded">
                      💡 Dica: Pratique no modo normal antes de tentar o desafio!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}