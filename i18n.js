(function () {
  const russian = {
    "Vladimir Belolipetskiy": "Владимир Белолипецкий",
    "VB": "ВБ",
    "Bio": "Биография",
    "Commercial Services": "Коммерческие услуги",
    "Research": "Исследования",
    "I turn complex retail data into practical decisions.": "Я превращаю сложные данные о розничной торговле в практические решения.",
    "I want to build analytical tools that make retail decisions clearer - from finding root causes and forecasting demand to testing pilots and improving pricing, product, and operational processes. I bring hands-on experience in SQL, Python, business analysis, and applied statistics.": "Я создаю аналитические инструменты, которые делают решения в розничной торговле понятнее: от поиска первопричин и прогнозирования спроса до проверки пилотов и улучшения ценообразования, продукта и операционных процессов. У меня есть практический опыт работы с SQL, Python, бизнес-анализом и прикладной статистикой.",
    "Curriculum vitae": "Резюме",
    "CV Preview": "Просмотр резюме",
    "Download CV PDF": "Скачать резюме в PDF",
    "Learn more about my commercial services": "Подробнее о моих коммерческих услугах",
    "Learn more about my research": "Подробнее о моих исследованиях",
    "Research | Vladimir Belolipetskiy": "Исследования | Владимир Белолипецкий",
    "Completed papers, presentations, and abstracts": "Завершённые статьи, презентации и тезисы",
    "Paper": "Статья",
    "Mathematical Methods of Managing a Retail Store as a Dynamic System: The Promotional Pricing Aspect": "Математические методы управления розничным магазином как динамической системой: аспект промо-ценообразования",
    "A game-theoretic and optimization framework for coordinating promotional pricing at store level.": "Теоретико-игровая и оптимизационная модель координации промо-ценообразования на уровне магазина.",
    "Download": "Скачать",
    "Slides": "Презентация",
    "Presentation for the 10th International Conference on Differential and Functional Differential Equations.": "Презентация для 10-й Международной конференции по дифференциальным и функционально-дифференциальным уравнениям.",
    "Abstract": "Тезисы",
    "A Queueing-Theoretic Framework for Controlling Customer Flow in Loyalty Programs Under Budget Constraints": "Теоретико-очередная модель управления потоком клиентов в программах лояльности при бюджетных ограничениях",
    "A state-dependent queueing model for financially sustainable loyalty-program progression.": "Зависимая от состояния модель очередей для финансово устойчивого развития программ лояльности.",
    "Current drafts": "Текущие черновики",
    "In-progress Work": "Работы в процессе",
    "Draft article": "Черновик статьи",
    "A Hierarchical Retail World Model for Interpretable Demand Decomposition": "Иерархическая модель мира розничной торговли для интерпретируемой декомпозиции спроса",
    "An operations-research framework for tracing retail outcomes back to interpretable upstream drivers.": "Модель исследования операций, связывающая результаты розничной торговли с интерпретируемыми первичными факторами.",
    "Working paper": "Рабочая статья",
    "Why BI Is Not Enough: The Move Toward Decision Intelligence": "Почему BI недостаточно: переход к интеллектуальным системам принятия решений",
    "A practical argument for moving from retrospective dashboards to constrained, learning decision systems.": "Практическое обоснование перехода от ретроспективных дашбордов к обучающимся системам принятия решений с ограничениями.",
    "Commercial Services | Vladimir Belolipetskiy": "Коммерческие услуги | Владимир Белолипецкий",
    "Vladimir Belolipetskiy | Commercial proposal": "Владимир Белолипецкий | Коммерческое предложение",
    "Applied Analytics & Decision Consulting": "Прикладная аналитика и консалтинг по принятию решений",
    "Research-grade thinking for practical business questions. I help retail, product, and strategy teams turn fragmented data into defensible decisions, clear operating rules, and useful analytical tools.": "Научная строгость для практических бизнес-задач. Я помогаю командам розничной торговли, продукта и стратегии превращать разрозненные данные в обоснованные решения, понятные правила работы и полезные аналитические инструменты.",
    "Explore services": "Посмотреть услуги",
    "Estimate a project": "Оценить проект",
    "Applied statistics": "Прикладная статистика",
    "Network analysis": "Сетевой анализ",
    "Retail analytics": "Аналитика розничной торговли",
    "Decision intelligence": "Интеллектуальные системы принятия решений",
    "Positioning": "Позиционирование",
    "Scientific discipline, commercial focus": "Научная строгость, коммерческий фокус",
    "My background combines applied statistics and network analysis with retail-sector experience and ongoing research into retail world models and decision intelligence. The emphasis is not mathematical theatre: it is careful problem definition, evidence, transparent assumptions, and recommendations that a business can act on.": "Мой опыт объединяет прикладную статистику и сетевой анализ с работой в розничной торговле и текущими исследованиями моделей розничного мира и интеллектуальных систем принятия решений. Главное здесь не математическая демонстративность, а точная постановка задачи, доказательность, прозрачные допущения и рекомендации, которые бизнес может применить на практике.",
    "View research": "Посмотреть исследования",
    "Download CV": "Скачать резюме",
    "HSE programme": "Программа НИУ ВШЭ",
    "Classes of work": "Направления работы",
    "How I can contribute": "Чем я могу быть полезен",
    "Engagements can be advisory-only or extend through analysis, implementation, and handover.": "Работа может ограничиваться консультацией или включать анализ, реализацию и передачу решения команде.",
    "Consulting & Decision Framing": "Консалтинг и постановка решений",
    "Clarify the real decision, identify evidence gaps, challenge assumptions, and define a practical path to action.": "Уточнение реального решения, поиск пробелов в данных, проверка допущений и определение практического плана действий.",
    "Executive decision briefs": "Краткие записки для руководителей",
    "Problem and hypothesis workshops": "Сессии по постановке задач и гипотез",
    "Independent analytical review": "Независимая аналитическая экспертиза",
    "Research and measurement roadmaps": "Дорожные карты исследований и измерений",
    "Market & Business Analysis": "Анализ рынка и бизнеса",
    "Build an evidence-based view of markets, categories, customers, competitors, and commercial scenarios.": "Формирование доказательной картины рынков, категорий, клиентов, конкурентов и коммерческих сценариев.",
    "Market entry and opportunity sizing": "Оценка выхода на рынок и размера возможностей",
    "Category and assortment diagnostics": "Диагностика категорий и ассортимента",
    "Segmentation and network analysis": "Сегментация и сетевой анализ",
    "Scenario and sensitivity analysis": "Сценарный анализ и анализ чувствительности",
    "Analytical Development": "Аналитическая разработка",
    "Turn repeatable decisions into lightweight models, prototypes, and tools that teams can use without a research department.": "Преобразование повторяющихся решений в лёгкие модели, прототипы и инструменты, которыми команды могут пользоваться без отдельного исследовательского подразделения.",
    "Forecasting and prioritization models": "Модели прогнозирования и приоритизации",
    "Decision-support prototypes": "Прототипы поддержки решений",
    "Automated analytical workflows": "Автоматизированные аналитические процессы",
    "Documentation and team handover": "Документация и передача решения команде",
    "Research Design & Validation": "Дизайн и проверка исследований",
    "Design credible studies and test whether existing analyses support the claims being made.": "Проектирование достоверных исследований и проверка того, подтверждают ли существующие анализы заявленные выводы.",
    "Experiment and pilot design": "Дизайн экспериментов и пилотов",
    "Methodology and model review": "Проверка методологии и моделей",
    "KPI and measurement frameworks": "Системы KPI и измерений",
    "Evidence synthesis and reporting": "Обобщение доказательств и отчётность",
    "Approximate price list": "Ориентировочный прайс-лист",
    "Simple rates, explicit assumptions": "Простые ставки, прозрачные допущения",
    "Final scope and a fixed estimate are agreed after a short diagnostic discussion.": "Итоговый объём работ и фиксированная оценка согласуются после короткой диагностической встречи.",
    "Regular task": "Стандартная задача",
    "/ hour": "/ час",
    "Well-defined work using established methods, available data, and a clear deliverable.": "Чётко определённая работа с использованием проверенных методов, доступных данных и понятного результата.",
    "Outstanding task": "Нестандартная задача",
    "High-stakes or ambiguous work requiring original research, custom modeling, or advanced validation.": "Высокорисковая или неоднозначная работа, требующая оригинального исследования, индивидуального моделирования или углублённой проверки.",
    "Typical engagement": "Типовой формат",
    "Expected effort": "Ожидаемые трудозатраты",
    "Regular": "Стандартная",
    "Outstanding": "Нестандартная",
    "Diagnostic review": "Диагностический обзор",
    "6-10 hours": "6–10 часов",
    "Focused analytical sprint": "Сфокусированный аналитический спринт",
    "20-40 hours": "20–40 часов",
    "Model or decision-tool prototype": "Прототип модели или инструмента принятия решений",
    "40-80 hours": "40–80 часов",
    "Ongoing advisory support": "Регулярная консультационная поддержка",
    "8-16 hours / month": "8–16 часов в месяц",
    "Package figures exclude urgency and scope-uncertainty adjustments shown in the calculator.": "Пакетные оценки не учитывают поправки на срочность и неопределённость объёма, показанные в калькуляторе.",
    "Illustrative case studies": "Примеры проектов",
    "What an engagement could look like": "Как может выглядеть проект",
    "These are representative scopes, not claims about completed client projects.": "Это примеры возможного объёма работ, а не заявления о завершённых клиентских проектах.",
    "Case 01": "Кейс 01",
    "Strategy + analysis": "Стратегия + анализ",
    "New Product Market Entrance": "Вывод нового продукта на рынок",
    "Should a new product enter this market, through which segment, and under what conditions?": "Стоит ли выводить новый продукт на этот рынок, через какой сегмент и при каких условиях?",
    "Size reachable demand, map customer segments and competitors, identify entry barriers, compare channel options, and test price-volume scenarios. The final recommendation includes explicit go, conditional-go, and stop criteria.": "Оценить достижимый спрос, сегменты клиентов и конкурентов, определить барьеры входа, сравнить каналы и проверить сценарии цены и объёма. Итоговая рекомендация включает чёткие критерии запуска, условного запуска и отказа.",
    "Outputs:": "Результаты:",
    "market map, scenario model, risk register, decision brief, 90-day validation plan.": "карта рынка, сценарная модель, реестр рисков, записка по решению, 90-дневный план проверки.",
    "Selected references": "Избранные источники",
    "OECD, Competition Assessment Toolkit": "ОЭСР, Инструментарий оценки конкуренции",
    "Cooper, Stage-Gate Idea-to-Launch Process": "Cooper, процесс Stage-Gate от идеи до запуска",
    "Case 02": "Кейс 02",
    "Retail + optimization": "Розница + оптимизация",
    "Category Management Optimization": "Оптимизация категорийного менеджмента",
    "Which products deserve space, where, and with what role in the category?": "Какие товары заслуживают места, где именно и какую роль они должны играть в категории?",
    "Combine sales, margin, availability, promotion, and substitution signals. Segment stores, clarify SKU roles, identify duplication and gaps, and propose listing, delisting, and range rules with safeguards for customer choice.": "Объединить сигналы продаж, маржи, доступности, промо и замещения. Сегментировать магазины, уточнить роли SKU, выявить дублирование и пробелы, предложить правила ввода, вывода и формирования ассортимента с учётом выбора клиента.",
    "category diagnostic, store clusters, assortment scenarios, KPI framework, implementation backlog.": "диагностика категории, кластеры магазинов, сценарии ассортимента, система KPI, бэклог внедрения.",
    "GS1, Category Management for Customer Needs": "GS1, Категорийный менеджмент для потребностей клиентов",
    "Kok, Fisher & Vaidyanathan, Assortment Planning": "Kok, Fisher и Vaidyanathan, Планирование ассортимента",
    "Case 03": "Кейс 03",
    "Forecasting + operations": "Прогнозирование + операции",
    "Demand Forecasting & Inventory Decisions": "Прогнозирование спроса и решения по запасам",
    "How much should the business expect to sell, and which exceptions need human attention?": "Какой объём продаж ожидать бизнесу и какие исключения требуют внимания человека?",
    "Audit demand data, establish transparent baselines, account for promotions and seasonality, compare forecast accuracy at useful business levels, and connect forecasts to replenishment or capacity scenarios.": "Провести аудит данных спроса, построить прозрачные базовые модели, учесть промо и сезонность, сравнить точность прогнозов на полезных для бизнеса уровнях и связать прогнозы со сценариями пополнения или мощностей.",
    "forecast benchmark, exception rules, scenario dashboard, operating recommendations, model documentation.": "эталонный прогноз, правила исключений, сценарный дашборд, операционные рекомендации, документация модели.",
    "Fildes, Ma & Kolassa, Retail Forecasting": "Fildes, Ma и Kolassa, Прогнозирование в розничной торговле",
    "Hyndman & Athanasopoulos, Forecasting: Principles and Practice": "Hyndman и Athanasopoulos, Прогнозирование: принципы и практика",
    "Case 04": "Кейс 04",
    "From BI Dashboards to Decisions": "От BI-дашбордов к решениям",
    "How can reporting be connected to ownership, action, and measurable business outcomes?": "Как связать отчётность с ответственностью, действиями и измеримыми бизнес-результатами?",
    "Map recurring decisions, their owners, inputs, constraints, and action thresholds. Identify where a dashboard is sufficient, where a recommendation layer adds value, and where human judgment must remain explicit.": "Описать повторяющиеся решения, их владельцев, входные данные, ограничения и пороги действий. Определить, где достаточно дашборда, где полезен рекомендательный слой и где человеческое суждение должно оставаться явным.",
    "decision map, KPI-to-action logic, prototype specification, governance model, adoption plan.": "карта решений, логика от KPI к действию, спецификация прототипа, модель управления, план внедрения.",
    "Delen & Demirkan, Data, Information and Analytics as Services": "Delen и Demirkan, Данные, информация и аналитика как услуги",
    "Shrestha, Ben-Menahem & von Krogh, AI Decision Structures": "Shrestha, Ben-Menahem и von Krogh, Структуры принятия решений с ИИ",
    "Budgeting tool": "Инструмент бюджетирования",
    "Project Cost Calculator": "Калькулятор стоимости проекта",
    "A transparent working estimate based on hours, classification, urgency, and scope certainty.": "Прозрачная предварительная оценка на основе часов, класса задачи, срочности и определённости объёма.",
    "Customer name": "Имя заказчика",
    "Company name": "Название компании",
    "Problem description": "Описание задачи",
    "Up to 3,000 characters. The text will be included in the request PDF.": "До 3 000 знаков. Текст будет включён в PDF-запрос.",
    "Service class": "Класс услуги",
    "Task classification": "Класс задачи",
    "Regular | $50/h": "Стандартная | $50/ч",
    "Outstanding | $100/h": "Нестандартная | $100/ч",
    "Urgency": "Срочность",
    "Standard | 1.00x": "Стандартная | 1,00×",
    "Priority | 1.25x": "Приоритетная | 1,25×",
    "Rush | 1.50x": "Срочная | 1,50×",
    "Scope certainty": "Определённость объёма",
    "Clear scope | no buffer": "Чёткий объём | без резерва",
    "Some unknowns | 10% buffer": "Есть неизвестные | резерв 10%",
    "Exploratory scope | 20% buffer": "Исследовательский объём | резерв 20%",
    "Expected hours": "Ожидаемые часы",
    "4h": "4 ч",
    "80h": "80 ч",
    "160h": "160 ч",
    "Form a request": "Сформировать запрос",
    "Your details stay in this browser and are only used to create the PDF.": "Ваши данные остаются в этом браузере и используются только для создания PDF.",
    "Working estimate": "Предварительная оценка",
    "Planning range: $1,584-$1,936": "Плановый диапазон: $1,584–$1,936",
    "Service": "Услуга",
    "Base rate": "Базовая ставка",
    "$50/hour": "$50/час",
    "Scope factor": "Коэффициент объёма",
    "32 hours x $50 x 1.00 x 1.10": "32 ч × $50 × 1,00 × 1,10",
    "Budget estimate only. Data acquisition, travel, taxes, and third-party software are not included.": "Это только предварительная оценка бюджета. Сбор данных, поездки, налоги и стороннее ПО не включены.",
    "Generated document": "Сформированный документ",
    "Project Request Preview": "Просмотр запроса на проект",
    "Download PDF": "Скачать PDF",
    "Next step": "Следующий шаг",
    "Start with a focused scope": "Начните с чётко ограниченной задачи",
    "A useful first engagement is often a 6-10 hour diagnostic that turns an open question into a decision plan.": "Полезный первый этап — диагностика на 6–10 часов, которая превращает открытый вопрос в план принятия решения.",
    "Review research": "Посмотреть исследования",
    "Language": "Язык",
    "Switch to English": "Переключить на английский",
    "Switch to Russian": "Переключить на русский",
    "Vladimir Belolipetskiy home": "Главная страница Владимира Белолипецкого",
    "Main navigation": "Основная навигация",
    "CV preview": "Просмотр резюме",
    "Learn more": "Подробнее",
    "Professional focus": "Профессиональный фокус",
    "Your full name": "Ваше имя",
    "Company or organization": "Компания или организация",
    "Describe the decision, available data, constraints, and the outcome you need.": "Опишите решение, доступные данные, ограничения и необходимый результат.",
    "Expected hours as a number": "Ожидаемое количество часов числом",
    "Generated project request PDF preview": "Просмотр сформированного PDF-запроса на проект",
    "Unable to load the regular PDF font.": "Не удалось загрузить обычный шрифт PDF.",
    "Unable to load the bold PDF font.": "Не удалось загрузить полужирный шрифт PDF.",
    "The PDF generator did not load. Please refresh the page and try again.": "Генератор PDF не загрузился. Обновите страницу и повторите попытку.",
    "Creating PDF...": "Создание PDF...",
    "Creating your project request...": "Создаём ваш запрос на проект...",
    "Request created. Preview it below or download the PDF.": "Запрос создан. Просмотрите его ниже или скачайте PDF.",
    "The PDF could not be created. Please try again.": "Не удалось создать PDF. Повторите попытку."
  };

  const english = Object.fromEntries(Object.entries(russian).map(([key, value]) => [value, key]));
  const ignoredParents = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);
  let language = "en";
  let scheduled = false;

  function normalize(value) {
    return value.trim().replace(/\s+/g, " ");
  }

  function dynamicEnglish(value) {
    return value
      .replace(/^Плановый диапазон:\s*/, "Planning range: ")
      .replace(/\/(?:час|ч)$/, "/hour")
      .replace(/^(\d+) ч × /, "$1 hours x ")
      .replace(/ × /g, " x ")
      .replace(/(\d),(\d)/g, "$1.$2");
  }

  function dynamicRussian(value) {
    return value
      .replace(/^Planning range:\s*/, "Плановый диапазон: ")
      .replace(/\/hour$/, "/час")
      .replace(/^(\d+) hours x /, "$1 ч × ")
      .replace(/ x /g, " × ")
      .replace(/(\d)\.(\d)/g, "$1,$2");
  }

  function translate(value) {
    const normalized = normalize(value);
    if (!normalized) return value;

    const canonical = english[normalized] || dynamicEnglish(normalized);
    const result = language === "ru" ? (russian[canonical] || dynamicRussian(canonical)) : canonical;
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    return leading + result + trailing;
  }

  function translateText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!node.parentElement || ignoredParents.has(node.parentElement.tagName)) return;
      const next = translate(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
  }

  function translateAttributes(root) {
    const elements = root.querySelectorAll ? root.querySelectorAll("[placeholder], [aria-label], [title]") : [];
    elements.forEach((element) => {
      ["placeholder", "aria-label", "title"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const current = element.getAttribute(attribute);
        const next = translate(current);
        if (next !== current) element.setAttribute(attribute, next);
      });
    });
  }

  function updateSwitcher() {
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function applyTranslations(root = document.documentElement) {
    translateText(root);
    translateAttributes(root);
    document.documentElement.lang = language;
    updateSwitcher();
  }

  function setLanguage(nextLanguage, updateUrl = true) {
    language = nextLanguage === "ru" ? "ru" : "en";
    localStorage.setItem("siteLanguage", language);

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (language === "ru") url.searchParams.set("lang", "ru");
      else url.searchParams.delete("lang");
      history.replaceState({}, "", url);
    }

    applyTranslations();
  }

  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  language = requestedLanguage === "ru" || requestedLanguage === "en"
    ? requestedLanguage
    : localStorage.getItem("siteLanguage") === "ru" ? "ru" : "en";

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  applyTranslations();

  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      applyTranslations();
    });
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });

  window.siteI18n = {
    get language() { return language; },
    setLanguage,
    t(value) { return translate(value).trim(); }
  };
})();
