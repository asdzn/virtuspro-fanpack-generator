import * as yup from 'yup'

export enum SocialNetwork {
	VK = 'vk',
	TELEGRAM = 'telegram',
	X = 'x',
}

// Функция для создания вариаций слова с заменой букв
const createWordVariations = (word: string): string[] => {
	const variations = [word]

	// Карта замен для русских букв
	const russianReplacements: Record<string, string[]> = {
		а: ['a', '@', '4', '*'],
		о: ['0', 'o', 'о', '*'],
		е: ['e', '3', 'е'],
		и: ['u', 'i', 'и', '1'],
		п: ['n', 'п'],
		р: ['p', 'р'],
		с: ['c', 'с'],
		у: ['y', 'у'],
		х: ['x', 'х'],
		б: ['6', 'b'],
		в: ['v', 'в'],
		з: ['3', 'z'],
		к: ['k', 'к'],
		л: ['l', 'л'],
		м: ['m', 'м'],
		н: ['h', 'н'],
		т: ['t', 'т'],
		ч: ['4'],
		ш: ['w'],
		ы: ['bi', 'ьi', 'ъi'],
	}

	// Создаем вариации для каждой буквы в слове
	for (let i = 0; i < word.length; i++) {
		const letter = word[i].toLowerCase()
		const replacements = russianReplacements[letter]

		if (replacements) {
			replacements.forEach(replacement => {
				variations.push(word.slice(0, i) + replacement + word.slice(i + 1))
			})
		}
	}

	// Добавляем вариации с точками и пробелами между буквами
	variations.push(word.split('').join('.'))
	variations.push(word.split('').join(' '))

	return variations
}

// Создаем расширенный список запрещенных слов
const createExtendedBannedWords = (words: string[]): string[] => {
	const extended: Set<string> = new Set()

	words.forEach(word => {
		// Добавляем оригинальное слово
		extended.add(word)

		// Добавляем вариации
		createWordVariations(word).forEach(variation => {
			extended.add(variation)
		})

		// Добавляем вариации с повторяющимися буквами
		extended.add(word.replace(/(.)/g, '$1$1'))
	})

	return Array.from(extended)
}

// Базовый список запрещенных слов
const baseBannedWords = [
	'днише',
	'лох',
	'днави',
	'даунил',
	'уебаны',
	'пидоры',
	'пидары',
	'пидор',
	'пидар',
	'hui',
	'suka',
	'пидарасина',
	'хуйпиздаджигурда',
	'еба',
	'ахуенно',
	'дцп',
	'раздача на стене',
	'нахуй',
	'pizdec',
	'blyad',
	'blyat',
	'даун',
	'дауны',
	'ебанутый',
	'нахуярил',
	'виртус дно',
	'пиздят',
	'тварь',
	'хуйню',
	'cука',
	'суkа',
	'сyka',
	'cyка',
	'сyка',
	'сykа',
	'сукa',
	'пиздуй',
	'сука',
	'раздача',
	'мой парень',
	'подписывайтесь',
	'пu3дец',
	'прихуел',
	'zaebal',
	'хуйни',
	'nahui',
	'ebaniy',
	'ебал',
	'нехуй',
	'выебут',
	'kek',
	'раздаю шмот',
	'раздача',
	'шмотка',
	'изменил парень',
	'вирт',
	'хуесосы',
	'нахуярился',
	'trainer',
	'продам аркану',
	'продам иммортал',
	'обменяю акк',
	'продам акк',
	'буст акка',
	'подпишись на паблик',
	'ширпотреб',
	'киньте на акк',
	'продам аккаунт',
	'pa3gam uhbehtapb',
	'mehя ha cтранице',
	'pa3gaм uhbehtapb',
	'пизже',
	'рулетка доты',
	'cs рулетка',
	'прогнозы на матчи',
	'ебнутая',
	'подпишись если не сложно',
	'мешает мне сосредоточится',
	'иллидаун',
	'халявные скины',
	'халявные ножи',
	'обмануть стим',
	'http',
	'www',
	'кейса',
	'вот сайт где',
	'можешь тащить катки один',
	'шкура',
	'залил юсп орион',
	'дохуя',
	'хуесос',
	'игил',
	'#поздравьдрузей',
	'бомжи',
	'youtube',
	'панцирь',
	'нереальный дроп',
	'на халяву',
	'на сtене',
	'бесплатный',
	'все пришло',
	'ссылка у меня на стене',
	'bесплаtnо',
	'ухожу в армию',
	'желаешь получить',
	'тогда узнай у меня',
	'зайди на стену',
	'я с бабой моей',
	'набираем сотрудников для',
	'волхак',
	'продаю стим аккаунт',
	'честная игра и партнёрка',
	'кoтяны',
	'вaшeу врeмя',
	'вывожу',
	'ебанутыми',
	'ёбнутыми',
	'пиздели',
	'проёбывали',
	'халявкой',
	'lotte',
	'лотте',
	'сцету',
	'долбаёбы',
	'жопохуй',
	'своей рулетке',
	'вывести скины',
	'смотрите стену',
	'смотрим стену',
	'супер сайт',
	'дота упала',
	'отправьте',
	'обмен',
	'сим упал',
	'обмен аегисами',
	'заепали',
	'админ сайта спалился',
	'подкручиваем',
	'подкурчивает',
	'подркутил',
	'долбаебы подркутить',
	'подкручивает',
	'подркутить',
	'подкрутка',
	'разъебут',
	'нужны скины',
	'изи подкрутоdки на сайте рулетки дотy 2',
	'хлама',
	'долбаебы',
	'huinya',
	'уебам',
	'уёбам',
	'уёба',
	'уеба',
	'збс',
	'ебанае',
	'бисплатныыаааяяяя',
	'ааааарkaнаа',
	'тутхалявнааайаарkahнннaаа',
	'хуйне',
	'pidarasi',
	'бледь',
	'йоба',
	'разъебём',
	'хач',
	'хачей',
	'ебанулись',
	'приебалась',
	'охуенные',
	'разъебывал',
	'разъебывать',
	'отпиздят',
	'вводим',
	'получаем',
	'разъёбывать',
	'разъёбывал',
	'трахают',
	'трахать',
	'блядина',
	'ублюдина',
	'членосос',
	'въебали',
	'блэт',
	'пиздоглазой',
	'пиздоглазый',
	'блять',
	'проеби',
	'zaebenit',
	'мудаки',
	'мудак',
	'мудаков',
	'pidoras',
	'байты',
	'байтите',
	'москали',
	'укроп',
	'монеты',
	'секс',
	'пи3да',
	'хуй',
	'член',
	'акция',
	'sooqa',
	'гавно',
	'хохлов',
	'хохол',
	'ватник',
	'колорад',
	'русофоб',
	'хохлы',
	'mаmкy',
	'eбaл',
	'лайки',
	'хуе',
	'писька',
	'первыйнах',
	'нах',
	'второйнах',
	'фриске',
	'дебил',
	'урод',
	'чмо',
	'нахуячат',
	'охуенная',
	'отсосать',
	'репост',
	'еблафон',
	'выдрочит',
	'дрочил',
	'дрочит',
	'уебется',
	'пиздeц',
	'обосрать',
	'охуенно',
	'чурка',
	'спиздили',
	'блеа',
	'хyu',
	'осите axуй ахер блюдок индос говна',
	'гавн',
	'пидр',
	'убогий',
	'отстойный',
	'пздеть',
	'пиздешь',
	'пездешь',
	'издежь',
	'изда всосали',
	'пидорами',
	'ебну',
	'долбоёб',
	'долбаёб',
	'долбаеб',
	'долбоеб',
	'хачик',
	'еблан',
	'блядь',
	'ебать',
	'ебали',
	'ебли',
	'уебок',
	'распиздяй',
	'уебать',
	'угондошить',
	'уебан',
	'хитровыебанный',
	'хуйня',
	'хуета',
	'хуево',
	'хуеть',
	'хуевертить',
	'хуеглот',
	'хуистика',
	'ебалу',
	'ebал',
	'поебать',
	'еблом',
	'ебальник',
	'ебало',
	'заебись',
	'котакбас',
	'злоебучая',
	'заёб',
	'мозгоёб',
	'разъебай',
	'доебаться',
	'ебаторий',
	'ебаться',
	'охуеть',
	'заебать',
	'заёбанный',
	'заебаться',
	'настоебать',
	'отъебаться',
	'приебаться',
	'ебануть',
	'ёбнуть',
	'ёбанный',
	'выебать',
	'наебнуть',
	'проебать',
	'разъебаться',
	'уёбывать',
	'блядки',
	'блядство',
	'пиздой',
	'пиздобратия',
	'пиздорванец',
	'пиздёныш',
	'xyu',
	'хуи',
	'пиздёж',
	'пиздеть',
	'допизделся',
	'распиздон',
	'пиздюк',
	'пиздануть',
	'пиздить',
	'пиздошить',
	'пиздюлей',
	'пиздюли',
	'отпиздил',
	'хуёвина',
	'хуёв',
	'хуев',
	'хуяк',
	'хули',
	'хуёво',
	'хуевато',
	'хуё-моё',
	'хуе-мое',
	'однохуйственно',
	'захуярить',
	'вхуярить',
	'вхуячить',
	'схуярить',
	'хуеплёт',
	'хуегрыз',
	'шобла-ёбла',
	'ебанатик',
	'дуроёб',
	'выёбываться',
	'выебывался',
	'ёбарь',
	'ёбнутый',
	'нихуясе',
	'eбать',
	'анониры',
	'чуркобес',
	'заебали',
	'ебаные',
	'взаим',
	'ебанат',
	'ебанашка',
	'анонир',
	'cekc',
	'тakoe',
	'cекс',
	'dobaвляемся',
	'pознakoмлюcь',
	'eбаный',
	'допизделись',
	'уроды',
	'соси',
	'соснули',
	'шалунишки',
	'выебем',
	'ёбу',
	'kpacивыe',
	'ебешь',
	'е6анутый',
	'добавляйтесь',
	'трахнешь',
	'хyли',
	'пздц',
	'пизды',
	'проебали',
	'зvонka',
	'охуел',
	'нихуя',
	'звони',
	'3нakoмcтвy',
	'шалуны',
	'охуенчик',
	'koшeчka',
	'3вoнka',
	'хуйсосы',
	'искусительницей',
	'ска3очный',
	'не3абываемые',
	'ебём',
	'pазvpат',
	'oрgaзmов',
	'рeбяma',
	'ахуенен',
	'проебут',
	'трахнуть',
	'минета',
	'зvониme',
	'хуле',
	'выебоны',
	'вьебать',
	'лайк на аву',
	'вступай',
	'онлаин подбор причёсок',
	'сmтрите мою стенy',
	'подбор причёсок',
	'продолжение здесь',
	'добавляйтесь в друзья',
	'хочешь 3000 голосов',
	'засорите лс',
	'лайков на аву',
	'твари',
	'поцелуйте 5 раз руку',
	'лайкну аву',
	'засорите личку',
	'лайк на',
	'лайкните',
	'напишите в лс',
	'наберу 1000 друзей',
	'посмотри под подушку',
	'помогите набрать',
	'первую запись',
	'напишите на стене',
	'на моей страничке',
	'засрите',
	'на аву',
	'поддержите лайками',
	'го в друзя',
	'пишите в лс',
	'зайди на страничку',
	'поцелуйте руку 5',
	'го в друзья',
	'запись на стене',
	'нужна помощь',
	'в друзья',
	'го лайки',
	'лайк все фото',
	'лайк взаимно',
	'даунов',
	'ебашил',
	'ебашу',
	'хохляндия',
	'уебеки',
	'сук',
	'ахуенчик',
	'ebalo',
	'долобебы',
	'дауничу',
	'даунич',
	'дауничем',
	'даунича',
	'съёбывать',
	'уепок',
	'пизди',
	'хуесосят',
	'хуесосить',
	'стим умер',
	'что со стимом',
	'разъебу',
	'ебошит',
	'ебаная',
	'помойка',
	'отсосали',
	'отсасали',
	'пох',
	'рулетку',
	'хакнул',
	'админки',
	'спиздил',
	'харе',
	'ебите',
	'хуесоса',
	'даунский',
	'ебанных',
	'говном',
	'изнасиловали',
	'говно',
	'пися',
	'го на стену',
	'долбаебом',
	'гея',
	'нихера',
	'гей',
	'порно',
	'ебнутые',
	'проебет',
	'выебу',
	'пездюк',
	'наепать',
	'porn',
	'пиздат',
	'нихуевый',
	'нихуева',
	'нихуево',
	'нихуёва',
	'нихуёво',
	'проебёт',
	'пиздуйте',
	'расхуярят',
	'спиздят',
	'проебано',
	'пиздаболия',
	'проебавать',
	'проебовать',
	'ебашить',
	'отпиздить',
	'письки',
	'мамку',
	'ска',
	'ебанарот',
	'спизженно',
	'подъеб',
	'блеать',
	'наебали',
	'заебался',
	'доебались',
	'биомусор',
	'ебошу',
	'viebal',
	'поимели',
	'пидоров',
	'епут',
	'ослоебов',
	'ослоебы',
	'помойку',
	'помойки',
	'помойке',
	'помойкай',
	'гейскую',
	'долбоёбы',
	'дерьма',
	'дерьмо',
	'бомжей',
	'бомжам',
	'блядей',
	'шалаве',
	'пиздаболы',
	'высрал',
	'ебашут',
	'eбашут',
	'eбашyт',
	'dolbaeb',
	'хуярит',
	'сасат',
	'подъебывают',
	'киберблядь',
	'проебите',
	'ебалом',
	'сосат',
	'подарите аегис взаимно',
	'подарочек',
	'го взаимно подарками',
	'гоу взаимно',
	'мне плиз',
	'кто взаимно го',
	'кому взаимно',
	'хочу подарок',
	'кидайте подарок',
	'обменяюсь подарками',
	'кликай на пак',
	'6лять',
	'сосатб',
	'сосед',
	'сосатт',
	'дворняга',
	'шалавы',
	'шалава',
	'ебанаты',
	'х0чeшь',
	'бecплатный скин',
	'скинцы',
	'дают скины',
	'becплaтныe',
	'cкиhы',
	'ckины',
	'проеба',
	'попизди',
	'скины бесплатно',
	'скин бесплатно',
	'получи скин',
	'хуярил',
	'пидору',
	'пидоpу',
	'пидoру',
	'разьебывай',
	'разьебет',
	'въебы',
	'ебанет',
	'скупаю аккаунты',
	'ебашьте',
	'разьебал',
	'хуею',
	'вьебали',
	'уебищное',
	'разъебные',
	'бля',
	'проебывают',
	'койны',
	'коинс',
	'майнинг',
	'майнинга',
	'куплю',
	'coin',
	'coins',
	'темная тема',
	'тёмная тема',
	'хуита',
	'хуяй',
	'хочешь заработать',
	'haxyй',
	'мой винрейт выше',
	'ебаного',
	'разьебало',
	'хуевые',
	'нахуячились',
	'ебана',
	'выебываются',
	'ебучий',
	'ахуе',
	'выебаны',
	'уебану',
	'бeeeсплaaatныеее ckиииhыыы yy meeeняя нааа cteeeнеее',
	'бeeсплaaatныее',
	'ckkииh',
	'фри awp',
	'free',
	'koooмyy hooж',
	'100 часов',
	'100ч',
	'100часов',
	'сто часов',
	'проеб',
	'проебаны',
	'отсос',
	'сосать',
	'пездабол',
	'трахал',
	'выебал',
	'шалаву',
	'мразь',
	'мрази',
	'мразота',
	'rat',
	'е6ет',
	'хуярю',
	'уебанская',
	'уебищных',
	'распиздел',
	'хуевыми',
	'выебанного',
	'пидором',
	'ахуеный',
	'xyecос',
	'гавнайт',
	'калорант',
	'каллорант',
	'uebok',
	'проебется',
	'е6ать',
	'разъебал',
	'дол6ае6',
	'дол6ае6ов',
	'далбаебу',
	'пизжу',
	'пюздюлей',
	'уе6ан',
	'leader bot',
	'разъёб',
	'прое6',
	'скинчики',
	'ра3дает',
	'уeбищe',
	'ебывание',
	'вахуе',
	'куколд',
	'заебешься',
	'проебан',
	'ибало',
	'долбаёбов',
	'дол6аё6у',
	'зае6ал',
	'хуeта',
	'разъебите',
	'пенис',
	'проебете',
	'возьму учетку с растом',
	'кс го праймом',
	'пиздаболом',
	'пизда',
	'пиздун',
	'пиздунчик',
	'пизденка',
	'учетку с кс прайм',
	'бюджет',
	'приличный',
	'eбaный',
	'https',
	'хуиплет',
	'хуиплета',
	'негр',
	'ниггер',
	'нигер',
	'ниигер',
	'нига',
	'путин',
	'хуйло',
	'зеленский',
	'зелински',
	'зеленским',
	'путлер',
	'ебалась',
	'мусор',
	'мхл',
]

// Создаем расширенный список и объединяем в регулярное выражение
const bannedWords = createExtendedBannedWords(baseBannedWords)
	.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Экранируем специальные символы
	.join('|')

// Создаем регулярное выражение только с основной проверкой
const bannedWordsRegex = new RegExp(
	`(${bannedWords})`, // Только проверка на запрещенные слова и их вариации
	'i'
)

export const generateFanpackSchema = yup.object().shape({
	socialNetworks: yup
		.array()
		.of(yup.mixed<SocialNetwork>().oneOf(Object.values(SocialNetwork)))
		.min(1, 'Please select at least one social network')
		.required('Please select social networks'),
	nickname: yup
		.string()
		.required('Please enter your nickname')
		.min(1, 'Nickname must be at least 1 character long')
		.max(36, 'Nickname must not exceed 36 characters')
		.test('no-banned-words', 'Nickname contains inappropriate words', value => {
			if (!value) return true

			// Удаляем повторяющиеся пробелы и точки
			const normalizedValue = value
				.toLowerCase()
				.replace(/\s+/g, ' ')
				.replace(/\.+/g, '.')

			// Проверяем нормализованное значение
			return !bannedWordsRegex.test(normalizedValue)
		}),
})

export type FanpackFormData = yup.InferType<typeof generateFanpackSchema>
