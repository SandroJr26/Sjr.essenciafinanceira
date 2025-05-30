// Funções principais para o site Essência Financeira - Versão atualizada com melhorias
// Autor: Manus AI
// Data: 30/05/2025

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações
    initAnimations();
    
    // Inicializar menu mobile
    initMobileMenu();
    
    // Inicializar contadores
    initCounters();
    
    // Inicializar formulário de dicas
    initTipsForm();
    
    // Inicializar toggle de tema
    initThemeToggle();
});

// Função para inicializar animações
function initAnimations() {
    const hiddenElements = document.querySelectorAll('.hidden');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    hiddenElements.forEach(element => {
        observer.observe(element);
    });
    
    // Adicionar classe loaded ao body após carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
}

// Função para inicializar menu mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.hamburger')) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Adicionar classe ao header ao rolar
    const header = document.querySelector('.header-sticky');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Função para inicializar contadores
function initCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const step = target / duration * 10;
                let current = 0;
                const isDecimal = target % 1 !== 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        entry.target.textContent = isDecimal ? target.toFixed(1) : target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                    }
                }, 10);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Função para inicializar formulário de dicas
function initTipsForm() {
    const tipsForm = document.getElementById('tipsForm');
    const tipsResult = document.getElementById('tipsResult');
    const tipsList = document.getElementById('tipsList');
    
    if (tipsForm && tipsResult && tipsList) {
        tipsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obter valores do formulário
            const name = document.getElementById('name').value;
            const income = parseFloat(document.getElementById('income').value);
            const debt = parseFloat(document.getElementById('debt').value);
            
            // Limpar lista de dicas
            tipsList.innerHTML = '';
            
            // Gerar dicas personalizadas baseadas nos dados
            const tips = generateFinancialTips(name, income, debt);
            
            // Adicionar dicas à lista
            tips.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                tipsList.appendChild(li);
            });
            
            // Mostrar resultado
            tipsResult.classList.add('active');
            
            // Rolar até o resultado
            setTimeout(() => {
                tipsResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });
    }
}

// Função para gerar dicas financeiras personalizadas
function generateFinancialTips(name, income, debt) {
    const tips = [];
    const debtRatio = debt / income;
    
    // Dica básica para todos
    tips.push(`${name}, estabeleça um orçamento mensal detalhado para controlar suas receitas e despesas.`);
    
    // Dicas baseadas na renda
    if (income < 3000) {
        tips.push('Considere fontes alternativas de renda para aumentar seu poder aquisitivo.');
        tips.push('Priorize a criação de uma reserva de emergência, mesmo que com valores pequenos inicialmente.');
    } else if (income < 7000) {
        tips.push('Destine pelo menos 10% da sua renda para investimentos de longo prazo.');
        tips.push('Diversifique suas fontes de renda para aumentar sua segurança financeira.');
    } else {
        tips.push('Com sua faixa de renda, considere diversificar seus investimentos para maximizar retornos.');
        tips.push('Consulte um profissional certificado CPA-10 para orientações sobre investimentos adequados ao seu perfil.');
    }
    
    // Dicas baseadas na dívida
    if (debtRatio > 0.5) {
        tips.push('Sua relação dívida/renda está alta. Priorize a quitação das dívidas com juros mais altos.');
        tips.push('Considere renegociar suas dívidas para obter melhores condições de pagamento.');
    } else if (debtRatio > 0.3) {
        tips.push('Sua relação dívida/renda está moderada. Crie um plano para reduzir gradualmente suas dívidas.');
    } else if (debt > 0) {
        tips.push('Sua relação dívida/renda está saudável. Continue mantendo o controle sobre suas dívidas.');
    } else {
        tips.push('Parabéns por não ter dívidas! Continue mantendo essa disciplina financeira.');
    }
    
    // Dica sobre investimentos com disclaimer
    tips.push('Lembre-se: informações sobre investimentos são fornecidas apenas por profissionais certificados CPA-10. Este conteúdo não constitui recomendação de investimento.');
    
    // Dica sobre educação financeira
    tips.push('Invista em sua educação financeira continuamente para tomar decisões mais conscientes.');
    
    return tips;
}

// Função para inicializar toggle de tema
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Verificar preferência do usuário
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Verificar configuração salva
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema inicial
    if (savedTheme === 'dark' || (savedTheme !== 'light' && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        if (icon) icon.className = 'fas fa-sun';
    }
    
    // Adicionar evento de clique
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Atualizar ícone
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
    }
}
