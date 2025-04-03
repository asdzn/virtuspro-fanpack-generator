import React, { useEffect, useRef, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'
import JSZip from 'jszip'

import { generateFanpackSchema, FanpackFormData, SocialNetwork } from 'schemas'

import {
	Icon28LogoTelegramIcon,
	Icon28LogoVkGlyph,
	Icon28LogoX,
	Spinner,
} from 'components/ui'

const Home = () => {
	interface SocialNetworkItem {
		id: number
		name: SocialNetwork
		icon: React.ReactNode
	}

	const SOCIAL_NETWORKS: SocialNetworkItem[] = [
		{
			id: 1,
			name: SocialNetwork.VK,
			icon: (
				<Icon28LogoVkGlyph className='w-full h-full' width={40} height={40} />
			),
		},
		{
			id: 2,
			name: SocialNetwork.TELEGRAM,
			icon: (
				<Icon28LogoTelegramIcon
					className='w-full h-full flex'
					width={40}
					height={40}
				/>
			),
		},
		{
			id: 3,
			name: SocialNetwork.X,
			icon: <Icon28LogoX className='w-full h-full' width={40} height={40} />,
		},
	]

	// fanpack form

	const [selectedNetworks, setSelectedNetworks] = useState<SocialNetwork[]>([])

	const {
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FanpackFormData>({
		resolver: yupResolver(generateFanpackSchema),
		mode: 'onChange',
	})

	const handleNetworkSelect = (networkName: SocialNetwork) => {
		setSelectedNetworks(prev => {
			const newSelection = prev.includes(networkName)
				? prev.filter(name => name !== networkName)
				: [...prev, networkName]

			setValue('socialNetworks', newSelection, {
				shouldValidate: true,
			})
			return newSelection
		})
	}

	// Добавляем состояние загрузки
	const [isGenerating, setIsGenerating] = useState(false)

	const submitForm = async (data: FanpackFormData) => {
		try {
			setIsGenerating(true)

			await new Promise(resolve => setTimeout(resolve, 500))

			await generateFanpack(data)
			reset()
			setSelectedNetworks([])
			toast.success('Fanpack successfully generated and downloaded')
		} catch (error) {
			console.error(error)
			toast.error('Error generating fanpack')
		} finally {
			setIsGenerating(false)
		}
	}

	// Добавим тип для позиционирования текста
	type TextPosition = {
		x: number
		y: number
		align: CanvasTextAlign
	}

	const calculateFontSize = (
		ctx: CanvasRenderingContext2D,
		text: string,
		maxWidth: number,
		type: 'avatar' | 'twitter' | 'vk'
	): number => {
		// Базовые настройки для разной длины текста
		const getBaseSize = (length: number) => {
			if (length <= 3) return 180 // Короткий текст
			if (length <= 6) return 156 // Средний текст
			if (length <= 10) return 120 // Длинный текст
			return 100 // Очень длинный текст
		}

		// Начальный размер в зависимости от длины текста
		let fontSize = getBaseSize(text.length)

		// Максимальная ширина для каждого типа
		const maxWidthPercent = {
			avatar: 0.92,
			twitter: 0.78,
			vk: 0.7,
		}[type]

		// Подгоняем размер
		ctx.font = `900 ${fontSize}px Muller`
		let textWidth = ctx.measureText(text).width

		while (textWidth > maxWidth * maxWidthPercent && fontSize > 30) {
			fontSize -= 2
			ctx.font = `900 ${fontSize}px Muller`
			textWidth = ctx.measureText(text).width
		}

		return fontSize
	}

	const generateImage = async (
		template: string,
		nickname: string,
		type: 'avatar' | 'twitter' | 'vk'
	): Promise<Blob> => {
		// Загружаем шрифт
		const font = new FontFace('Muller', 'url(/fonts/MullerExtraBold.woff2)', {
			weight: '900',
			style: 'normal',
		})

		// Ждем загрузки шрифта
		await font.load()

		// Добавляем шрифт в document.fonts
		document.fonts.add(font)

		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')

		if (!ctx) {
			throw new Error('Failed to get canvas context')
		}

		// Загружаем изображение
		const img = new Image()
		await new Promise(resolve => {
			img.onload = resolve
			img.src = template
		})

		// Устанавливаем размеры canvas
		canvas.width = img.width
		canvas.height = img.height

		// Рисуем изображение
		ctx.drawImage(img, 0, 0)

		// Рассчитываем размер шрифта
		const fontSize = calculateFontSize(ctx, nickname, canvas.width, type)

		// Настраиваем базовый стиль текста
		ctx.fillStyle = '#987c4b'
		ctx.font = `900 ${fontSize}px Muller`
		ctx.textBaseline = 'middle'
		ctx.letterSpacing = '-0.052em'

		let textPosition: TextPosition

		switch (type) {
			case 'avatar':
				textPosition = {
					x: canvas.width / 2,
					y: canvas.height / 2,
					align: 'center',
				}
				break

			case 'twitter':
				textPosition = {
					x: canvas.width - 96,
					y: 420,
					align: 'right',
				}
				break

			case 'vk':
				textPosition = {
					x: canvas.width - 50,
					y: 372,
					align: 'right',
				}
				break
		}

		// Применяем выравнивание текста
		ctx.textAlign = textPosition.align

		// Добавляем текст в нужной позиции
		ctx.fillText(nickname, textPosition.x, textPosition.y)

		// Конвертируем в blob
		return new Promise((resolve, reject) => {
			canvas.toBlob(blob => {
				if (blob) {
					resolve(blob)
				} else {
					reject(new Error('Failed to create blob'))
				}
			}, 'image/png')
		})
	}

	const generateFanpack = async (data: FanpackFormData) => {
		// Если выбран только Telegram - скачиваем один файл напрямую
		if (
			data.socialNetworks.length === 1 &&
			data.socialNetworks[0] === SocialNetwork.TELEGRAM
		) {
			const avatar = await generateImage(
				'/templates/avatar.png',
				data.nickname,
				'avatar'
			)
			const url = URL.createObjectURL(avatar)
			const link = document.createElement('a')
			link.href = url
			link.download = `avatar.png`
			link.click()
			URL.revokeObjectURL(url)
			return
		}

		// Для остальных случаев создаем архив
		const zip = new JSZip()

		// Генерируем аватар если выбран любой из сервисов
		if (data.socialNetworks.length > 0) {
			const avatar = await generateImage(
				'/templates/avatar.png',
				data.nickname,
				'avatar'
			)
			zip.file('avatar.png', avatar)
		}

		// Добавляем обложку VK если выбран VK
		if (data.socialNetworks.includes(SocialNetwork.VK)) {
			const vkCover = await generateImage(
				'/templates/cover_vk.png',
				data.nickname,
				'vk'
			)
			zip.file('cover_vk.png', vkCover)
		}

		// Добавляем обложку X если выбран X
		if (data.socialNetworks.includes(SocialNetwork.X)) {
			const xCover = await generateImage(
				'/templates/cover_x.png',
				data.nickname,
				'twitter'
			)
			zip.file('cover_x.png', xCover)
		}

		// Генерируем и скачиваем архив
		const content = await zip.generateAsync({ type: 'blob' })
		const url = URL.createObjectURL(content)

		const link = document.createElement('a')
		link.href = url
		link.download = `fanpack-${data.nickname}.zip`
		link.click()

		URL.revokeObjectURL(url)
	}

	return (
		<React.Fragment>
			<section className='@container max-w-screen-sm w-full mx-auto flex flex-col px-2 gap-5 my-auto'>
				<form
					onSubmit={handleSubmit(submitForm)}
					className='@container/section flex flex-col p-10 @md:p-12 gap-8 @md:gap-12 bg-black rounded-2xl overflow-hidden relative z-0'
				>
					<div className='flex flex-col gap-4'>
						<span className='font-bold text-base uppercase text-white'>
							1. Choose a social network
						</span>

						<div className='w-full flex flex gap-1 text-xs'>
							{SOCIAL_NETWORKS.map(item => (
								<button
									type='button'
									key={item.id}
									onClick={() => handleNetworkSelect(item.name)}
									className={twMerge(
										'w-full transition-all duration-300 text-white rounded-lg py-6 flex items-center justify-center gap-2 uppercase cursor-pointer',
										selectedNetworks.includes(item.name)
											? 'bg-ewc-gold hover:bg-ewc-gold-light'
											: 'bg-ewc-dark hover:bg-ewc-gold'
									)}
								>
									{item.icon}
								</button>
							))}
						</div>
					</div>

					<span className='w-full h-px bg-white/15' />

					<div className='flex flex-col gap-4 relative'>
						<label
							htmlFor='nickname'
							className='font-bold text-base uppercase text-white cursor-pointer'
						>
							2. Enter your nickname
						</label>

						<div className='flex flex-col gap-1'>
							<input
								{...register('nickname')}
								id='nickname'
								name='nickname'
								aria-labelledby='nicknameType'
								type='text'
								className='w-full h-16 text-white rounded-md ring-0 focus:ring-0 focus:outline-none text-3xl select-none font-medium'
								placeholder='Enter nickname'
							/>

							{errors.nickname && (
								<span className='absolute -bottom-3 left-0 text-red-500 text-sm'>
									{errors.nickname?.message}
								</span>
							)}
						</div>
					</div>

					<button
						type='submit'
						className={twMerge(
							'mx-auto max-w-4/5 @sm:max-w-1/2 w-full h-16 bg-ewc-gold hover:bg-ewc-gold-light transition-colors duration-300 text-white rounded-lg px-4 flex items-center justify-center gap-2 font-bold text-base uppercase cursor-pointer tracking-widest select-none leading-none',
							'disabled:opacity-80 disabled:cursor-not-allowed'
						)}
						disabled={!isValid || isGenerating}
					>
						{isGenerating ? (
							<Spinner className='text-white' width={32} height={32} />
						) : (
							<span className='pt-0.5'>Generate</span>
						)}
					</button>

					<img
						src='/images/ewc-background.png'
						alt='Background'
						className='absolute top-0 left-0 -z-1 w-full h-full object-cover opacity-50'
					/>
				</form>
			</section>
		</React.Fragment>
	)
}

export { Home }
