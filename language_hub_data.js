const languageData = {
    english: {
        name: "English",
        flag: "https://flagcdn.com/w80/gb.png",
        color: "#2563eb",
        wallpaper: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&auto=format&fit=crop",
        weekTerm: "Week",
        comicSearch: "london-illustration,comic",
        roadmap: [
            { week: 1, topic: "Nouns, Pronouns, Articles", concepts: "Countable/Uncountable, A/An/The", bgQuery: "alphabet", accent: "#3b82f6" },
            { week: 2, topic: "Adjectives & Adverbs", concepts: "Comparisons, Degrees", bgQuery: "colors", accent: "#8b5cf6" },
            { week: 3, topic: "Prepositions", concepts: "In/On/At, Direction", bgQuery: "compass", accent: "#10b981" },
            { week: 4, topic: "Present Tenses", concepts: "Simple, Continuous, Perfect", bgQuery: "clock", accent: "#f59e0b" },
            { week: 5, topic: "Past Tenses", concepts: "Simple, Continuous, Perfect", bgQuery: "vintage", accent: "#6366f1" },
            { week: 6, topic: "Future Tenses", concepts: "Will vs. Going to", bgQuery: "space", accent: "#ec4899" },
            { week: 7, topic: "Sentence Mechanics", concepts: "Subject-Verb Agreement", bgQuery: "engine", accent: "#14b8a6" },
            { week: 8, topic: "Conjunctions", concepts: "And, But, Because", bgQuery: "bridge", accent: "#f43f5e" },
            { week: 9, topic: "Clauses", concepts: "Relative Clauses", bgQuery: "puzzle", accent: "#8b5cf6" },
            { week: 10, topic: "Conditionals", concepts: "Zero to 3rd", bgQuery: "choice", accent: "#06b6d4" },
            { week: 11, topic: "Passive & Reported Speech", concepts: "Indirect speech", bgQuery: "microphone", accent: "#f97316" },
            { week: 12, topic: "Advanced Usage", concepts: "Phrasal Verbs, Gerunds", bgQuery: "mountain", accent: "#475569" }
        ],
        resources: [
            { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish/" },
            { name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/" },
            { name: "English Grammar in Use", url: "https://www.google.com/search?q=English+Grammar+in+Use" },
            { name: "Duolingo", url: "https://www.duolingo.com/learn" }
        ]
    },
    korean: {
        name: "Hangul",
        flag: "https://flagcdn.com/w80/kr.png",
        color: "#dc2626",
        wallpaper: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1920&auto=format&fit=crop",
        weekTerm: "Week",
        comicSearch: "seoul-illustration,anime",
        roadmap: [
            { week: 1, topic: "Hangeul Alphabet", topic_my: "Abjad Hangeul", concepts: "Reading & Writing", concepts_my: "Membaca & Menulis", bgQuery: "calligraphy", accent: "#ef4444" },
            { week: 2, topic: "Vowels & Consonants", topic_my: "Vokal & Konsonan", concepts: "Double consonants", concepts_my: "Konsonan berganda", bgQuery: "ink", accent: "#3b82f6" },
            { week: 3, topic: "Sentence Structure", topic_my: "Struktur Ayat", concepts: "SOV Pattern", concepts_my: "Corak SOV", bgQuery: "bricks", accent: "#10b981" },
            { week: 4, topic: "Particles (I/Ga, Eun/Neun)", topic_my: "Partikel", concepts: "Subject vs Topic", concepts_my: "Subjek vs Topik", bgQuery: "pin", accent: "#f59e0b" },
            { week: 5, topic: "Verb Conjugation", topic_my: "Konjugasi Kata Kerja", concepts: "Present tense", concepts_my: "Masa kini", bgQuery: "flow", accent: "#8b5cf6" },
            { week: 6, topic: "Politeness Levels", topic_my: "Tahap Kesopanan", concepts: "Informal, Polite, Formal", concepts_my: "Informal, Sopan, Formal", bgQuery: "bow", accent: "#6366f1" },
            { week: 7, topic: "Numbers & Counting", topic_my: "Nombor & Mengira", concepts: "Native vs Sino-Korean", concepts_my: "Asli vs Sino-Korea", bgQuery: "math", accent: "#ec4899" },
            { week: 8, topic: "Question Words", topic_my: "Kata Tanya", concepts: "Who, What, Where", concepts_my: "Siapa, Apa, Mana", bgQuery: "question", accent: "#14b8a6" },
            { week: 9, topic: "Daily Activities", topic_my: "Aktiviti Harian", concepts: "Eating, Sleeping, Working", concepts_my: "Makan, Tidur, Kerja", bgQuery: "coffee", accent: "#f43f5e" },
            { week: 10, topic: "Time & Dates", topic_my: "Masa & Tarikh", concepts: "Days of the week", concepts_my: "Hari dalam seminggu", bgQuery: "calendar", accent: "#06b6d4" },
            { week: 11, topic: "Descriptive Verbs", topic_my: "Kata Kerja Deskriptif", concepts: "Adjectives", concepts_my: "Kata Adjektif", bgQuery: "paint", accent: "#f97316" },
            { week: 12, topic: "Conversations", topic_my: "Perbualan", concepts: "Basic survival Korean", concepts_my: "Bahasa Korea asas", bgQuery: "chat", accent: "#475569" }
        ],
        resources: [
            { name: "Talk To Me In Korean", url: "https://talktomeinkorean.com/" },
            { name: "HowToStudyKorean", url: "https://www.howtostudykorean.com/" },
            { name: "KoreanClass101", url: "https://www.koreanclass101.com/" },
            { name: "Duolingo", url: "https://www.duolingo.com/learn" }
        ]
    },
    chinese: {
        name: "Mandarin",
        flag: "https://flagcdn.com/w80/cn.png",
        color: "#ea580c",
        wallpaper: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1920&auto=format&fit=crop",
        weekTerm: "Week",
        comicSearch: "shanghai-illustration,comic",
        roadmap: [
            { week: 1, topic: "Tones & Pinyin", topic_my: "Nada & Pinyin", concepts: "The 4 tones", concepts_my: "4 nada asas", bgQuery: "music", accent: "#f97316" },
            { week: 2, topic: "Numbers 1-100", topic_my: "Nombor 1-100", concepts: "Counting system", concepts_my: "Sistem mengira", bgQuery: "calculation", accent: "#ef4444" },
            { week: 3, topic: "Pronouns & Greetings", topic_my: "Kata Ganti Nama & Salam", concepts: "Ni hao, Wo, Ni", concepts_my: "Ni hao, Wo, Ni", bgQuery: "people", accent: "#3b82f6" },
            { week: 4, topic: "Basic Sentence Structure", topic_my: "Struktur Ayat Asas", concepts: "Subject + Verb + Object", concepts_my: "Subjek + Kerja + Objek", bgQuery: "structure", accent: "#10b981" },
            { week: 5, topic: "Question Particles (Ma)", topic_my: "Partikel Soalan (Ma)", concepts: "Asking yes/no questions", concepts_my: "Soalan ya/tidak", bgQuery: "lightbulb", accent: "#f59e0b" },
            { week: 6, topic: "Dates & Time", topic_my: "Tarikh & Masa", concepts: "Days & Months", concepts_my: "Hari & Bulan", bgQuery: "watch", accent: "#8b5cf6" },
            { week: 7, topic: "Measure Words", topic_my: "Kata Penjodoh Bilangan", concepts: "Ge, Ben, Zhang", concepts_my: "Ge, Ben, Zhang", bgQuery: "stack", accent: "#6366f1" },
            { week: 8, topic: "Possession (De)", topic_my: "Kepunyaan (De)", concepts: "Showing ownership", concepts_my: "Menunjukkan milik", bgQuery: "key", accent: "#ec4899" },
            { week: 9, topic: "Common Verbs", topic_my: "Kata Kerja Umum", concepts: "Eat, Drink, See", concepts_my: "Makan, Minum, Lihat", bgQuery: "market", accent: "#14b8a6" },
            { week: 10, topic: "Locations", topic_my: "Lokasi", concepts: "In, On, Under", concepts_my: "Dalam, Atas, Bawah", bgQuery: "map", accent: "#f43f5e" },
            { week: 11, topic: "Hobbies", topic_my: "Hobi", concepts: "Likes & Dislikes", concepts_my: "Suka & Tidak suka", bgQuery: "hobby", accent: "#06b6d4" },
            { week: 12, topic: "Final Review", topic_my: "Ulasan Akhir", concepts: "Basic conversation", concepts_my: "Perbualan asas", bgQuery: "trophy", accent: "#475569" }
        ],
        resources: [
            { name: "ChinesePod", url: "https://www.chinesepod.com/" },
            { name: "Yoyo Chinese", url: "https://yoyochinese.com/" },
            { name: "HSK Academy", url: "https://www.hskacademy.com/" },
            { name: "Duolingo", url: "https://www.duolingo.com/learn" }
        ]
    },
    philippine: {
        name: "Tagalog",
        flag: "https://flagcdn.com/w80/ph.png",
        color: "#0284c7",
        wallpaper: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1920&auto=format&fit=crop",
        weekTerm: "Week",
        comicSearch: "manila-illustration,comic",
        roadmap: [
            { week: 1, topic: "Pronunciation & Greetings", topic_my: "Sebutan & Salam", concepts: "Salamat, Kumusta", concepts_my: "Salamat, Kumusta", bgQuery: "tropical", accent: "#0ea5e9" },
            { week: 2, topic: "Pronouns (Ang Form)", topic_my: "Kata Ganti Nama (Bentuk Ang)", concepts: "Ako, Ikaw, Siya", concepts_my: "Ako, Ikaw, Siya", bgQuery: "beach", accent: "#3b82f6" },
            { week: 3, topic: "Markers (Ang, Ng, Sa)", topic_my: "Penanda", concepts: "Definite vs Indefinite", concepts_my: "Tentu vs Tidak tentu", bgQuery: "label", accent: "#10b981" },
            { week: 4, topic: "Verb Focus (Actor)", topic_my: "Fokus Kata Kerja (Pelaku)", concepts: "Mag- and Um- verbs", concepts_my: "Kata kerja Mag- dan Um-", bgQuery: "running", accent: "#f59e0b" },
            { week: 5, topic: "Numbers & Currency", topic_my: "Nombor & Mata Wang", concepts: "Counting in Tagalog", concepts_my: "Mengira dalam Tagalog", bgQuery: "coins", accent: "#8b5cf6" },
            { week: 6, topic: "Common Adjectives", topic_my: "Kata Adjektif Umum", concepts: "Ma- prefix", concepts_my: "Awalan Ma-", bgQuery: "nature", accent: "#6366f1" },
            { week: 7, topic: "Verb Focus (Object)", topic_my: "Fokus Kata Kerja (Objek)", concepts: "I- and -In verbs", concepts_my: "Kata kerja I- dan -In", bgQuery: "box", accent: "#ec4899" },
            { week: 8, topic: "Enclitic Particles", topic_my: "Partikel Enclitik", concepts: "Pa, Na, Lang", concepts_my: "Pa, Na, Lang", bgQuery: "bubbles", accent: "#14b8a6" },
            { week: 9, topic: "Negation", topic_my: "Penafian", concepts: "Hindi vs Huwag", concepts_my: "Hindi vs Huwag", bgQuery: "no", accent: "#f43f5e" },
            { week: 10, topic: "Expressing Wants", topic_my: "Menyatakan Keinginan", concepts: "Gusto vs Ayaw", concepts_my: "Gusto vs Ayaw", bgQuery: "heart", accent: "#06b6d4" },
            { week: 11, topic: "Family & Home", topic_my: "Keluarga & Rumah", concepts: "Tatay, Nanay, Bahay", concepts_my: "Ayah, Ibu, Rumah", bgQuery: "home", accent: "#f97316" },
            { week: 12, topic: "Daily Scenarios", topic_my: "Senario Harian", concepts: "Ordering food", concepts_my: "Memesan makanan", bgQuery: "restaurant", accent: "#475569" }
        ],
        resources: [
            { name: "Tagalog.com", url: "https://www.tagalog.com/" },
            { name: "Learning Tagalog", url: "https://learningtagalog.com/" },
            { name: "FilipinoPod101", url: "https://www.filipinopod101.com/" },
            { name: "Duolingo", url: "https://www.duolingo.com/learn" }
        ]
    },
    malay: {
        name: "Bahasa Melayu",
        flag: "https://flagcdn.com/w80/my.png",
        color: "#059669",
        wallpaper: "https://images.unsplash.com/photo-1596422846543-75c6fc18a594?q=80&w=1920&auto=format&fit=crop",
        weekTerm: "Minggu",
        comicSearch: "malaysia-illustration,comic",
        roadmap: [
            { week: 1, topic: "Alphabet & Greetings", concepts: "Apa khabar, Terima kasih", bgQuery: "malaysia", accent: "#10b981" },
            { week: 2, topic: "Introductions", concepts: "Nama saya..., Saya, Awak", bgQuery: "culture", accent: "#3b82f6" },
            { week: 3, topic: "Core Verbs", concepts: "Nak, Makan, Minum", bgQuery: "food", accent: "#f59e0b" },
            { week: 4, topic: "Time Indicators", concepts: "Sudah, Sedang, Akan", bgQuery: "time", accent: "#8b5cf6" },
            { week: 5, topic: "Questions", concepts: "Apa, Bila, Di mana", bgQuery: "discover", accent: "#6366f1" },
            { week: 6, topic: "Numbers & Time", concepts: "Counting 1-100", bgQuery: "counting", accent: "#ec4899" },
            { week: 7, topic: "Adjectives", concepts: "Noun + Adjective + Yang", bgQuery: "beauty", accent: "#14b8a6" },
            { week: 8, topic: "Prepositions", concepts: "Di, Ke, Dari", bgQuery: "travel", accent: "#f43f5e" },
            { week: 9, topic: "Affixes", concepts: "MeN- and Pe-", bgQuery: "puzzle", accent: "#06b6d4" },
            { week: 10, topic: "Conjunctions", concepts: "Dan, Tetapi, Kerana", bgQuery: "links", accent: "#f97316" },
            { week: 11, topic: "Colloquialism", concepts: "Lah, Kan, Jom", bgQuery: "local", accent: "#475569" },
            { week: 12, topic: "Conversations", ordering: "Food & Directions", bgQuery: "market", accent: "#2563eb" }
        ],
        resources: [
            { name: "Learn Malay with Cikgu", url: "https://www.youtube.com/results?search_query=Learn+Malay+with+Cikgu" },
            { name: "Malay Language Guide", url: "https://www.google.com/search?q=Malay+Language+Guide" },
            { name: "Duolingo", url: "https://www.duolingo.com/learn" },
            { name: "Omniglot (Malay)", url: "https://omniglot.com/language/phrases/malay.php" }
        ]
    },
    indonesian: {
        name: "Indonesian",
        flag: "https://flagcdn.com/w80/id.png",
        color: "#ef4444",
        wallpaper: "https://images.unsplash.com/photo-1555040479-c949debe66c1?q=80&w=1920&auto=format&fit=crop",
        weekTerm: "Minggu",
        comicSearch: "indonesia-illustration,comic",
        roadmap: [
            { week: 1, topic: "Alphabet & Greetings", topic_my: "Abjad & Salam", concepts: "Halo, Apa kabar", concepts_my: "Halo, Apa kabar", bgQuery: "bali", accent: "#ef4444" },
            { week: 2, topic: "Introductions", topic_my: "Pengenalan", concepts: "Aku, Kamu", concepts_my: "Aku, Kamu", bgQuery: "face", accent: "#3b82f6" },
            { week: 3, topic: "Core Verbs", topic_my: "Kata Kerja Teras", concepts: "Mau, Makan, Minum", concepts_my: "Mau, Makan, Minum", bgQuery: "dish", accent: "#f59e0b" },
            { week: 4, topic: "Time Indicators", topic_my: "Penunjuk Masa", concepts: "Sudah, Sedang, Akan", concepts_my: "Sudah, Sedang, Akan", bgQuery: "clock", accent: "#8b5cf6" },
            { week: 5, topic: "Questions", topic_my: "Soalan", concepts: "Apa, Kapan, Di mana", concepts_my: "Apa, Kapan, Di mana", bgQuery: "search", accent: "#6366f1" },
            { week: 6, topic: "Numbers & Time", topic_my: "Nombor & Masa", concepts: "Counting 1-100", concepts_my: "Mengira 1-100", bgQuery: "numbers", accent: "#ec4899" },
            { week: 7, topic: "Adjectives", topic_my: "Kata Adjektif", concepts: "Noun + Adjective + Yang", concepts_my: "Kata Nama + Kata Adjektif + Yang", bgQuery: "mountain", accent: "#14b8a6" },
            { week: 8, topic: "Prepositions", topic_my: "Kata Sendi Nama", concepts: "Di, Ke, Dari", concepts_my: "Di, Ke, Dari", bgQuery: "road", accent: "#f43f5e" },
            { week: 9, topic: "Affixes", topic_my: "Imbuhan", concepts: "MeN- and Pe-", concepts_my: "MeN- and Pe-", bgQuery: "craft", accent: "#06b6d4" },
            { week: 10, topic: "Conjunctions", topic_my: "Kata Hubung", concepts: "Dan, Tetapi, Karena", concepts_my: "Dan, Tetapi, Karena", bgQuery: "chain", accent: "#f97316" },
            { week: 11, topic: "Bahasa Gaul", topic_my: "Bahasa Gaul", concepts: "Banget, Sih, Dong", concepts_my: "Banget, Sih, Dong", bgQuery: "street", accent: "#475569" },
            { week: 12, topic: "Conversations", topic_my: "Perbualan", concepts: "Jakarta interactions", concepts_my: "Interaksi Jakarta", bgQuery: "jakarta", accent: "#2563eb" }
        ],
        resources: [
            { name: "IndonesianPod101", url: "https://www.indonesianpod101.com/" },
            { name: "Learn Indonesian with Cinta", url: "https://www.youtube.com/results?search_query=Learn+Indonesian+with+Cinta" },
            { name: "LearningIndonesian", url: "https://www.learningindonesian.com/" },
            { name: "Duolingo", url: "https://www.duolingo.com/learn" }
        ]
    },
    japanese: {
        name: "Japanese",
        flag: "https://flagcdn.com/w80/jp.png",
        color: "#bc002d",
        wallpaper: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop",
        weekTerm: "Week",
        comicSearch: "japan-illustration,anime",
        roadmap: [
            { week: 1, topic: "Hiragana Basics", topic_my: "Asas Hiragana", concepts: "Vowels & K-Row", concepts_my: "Vokal & Baris-K", bgQuery: "calligraphy", accent: "#bc002d" },
            { week: 2, topic: "Katakana", topic_my: "Katakana", concepts: "Foreign Loanwords", concepts_my: "Kata Pinjaman Luar", bgQuery: "neon", accent: "#3b82f6" },
            { week: 3, topic: "Basic Kanji", topic_my: "Kanji Asas", concepts: "Numbers & Days", concepts_my: "Nombor & Hari", bgQuery: "temple", accent: "#10b981" },
            { week: 4, topic: "Greetings & Intro", topic_my: "Salam & Pengenalan", concepts: "Hajimemashite", concepts_my: "Hajimemashite", bgQuery: "bow", accent: "#f59e0b" },
            { week: 5, topic: "To be (Desu/Arimasu)", topic_my: "Menjadi (Desu/Arimasu)", concepts: "Existence", concepts_my: "Kewujudan", bgQuery: "mount-fuji", accent: "#8b5cf6" },
            { week: 6, topic: "Particles (Wa, Ga, O)", topic_my: "Partikel (Wa, Ga, O)", concepts: "The big 3", concepts_my: "3 Partikel Besar", bgQuery: "connections", accent: "#6366f1" },
            { week: 7, topic: "Basic Verbs", topic_my: "Kata Kerja Asas", concepts: "Taberu, Nomu, Iku", concepts_my: "Makan, Minum, Pergi", bgQuery: "sushi", accent: "#ec4899" },
            { week: 8, topic: "Adjectives", topic_my: "Kata Adjektif", concepts: "I-adj vs Na-adj", concepts_my: "Kata Adjektif-I vs Kata Adjektif-Na", bgQuery: "kimono", accent: "#14b8a6" },
            { week: 9, topic: "Question Words", topic_my: "Kata Tanya", concepts: "Nani, Doko, Itsu", concepts_my: "Apa, Di mana, Bila", bgQuery: "lantern", accent: "#f43f5e" },
            { week: 10, topic: "Time & Places", topic_my: "Masa & Tempat", concepts: "Ni particle", concepts_my: "Partikel Ni", bgQuery: "railway", accent: "#06b6d4" },
            { week: 11, topic: "Connecting Words", topic_my: "Kata Hubung", concepts: "Soshite, Demo", concepts_my: "Dan, Tetapi", bgQuery: "garden", accent: "#f97316" },
            { week: 12, topic: "JLPT N5 Intro", topic_my: "Pengenalan JLPT N5", concepts: "Vocabulary & Review", concepts_my: "Kosa Kata & Ulasan", bgQuery: "samurai", accent: "#475569" }
        ],
        resources: [
            { name: "JapanesePod101", url: "https://www.japanesepod101.com/" },
            { name: "Tae Kim's Guide", url: "https://guidetojapanese.org/learn/" },
            { name: "NHK Easy Japanese", url: "https://www.nhk.or.jp/lesson/english/" },
            { name: "Duolingo", url: "https://www.duolingo.com/learn" }
        ]
    }
};
