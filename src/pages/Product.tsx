import React, { useState, useEffect } from 'react';
import { Star, Shield, Truck, Youtube, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function Product() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userCountry, setUserCountry] = useState('United States');
  const [userLanguage, setUserLanguage] = useState('en');
  const [shippingDates, setShippingDates] = useState({ start: 'November 22', end: 'November 29' });
  const [isLoading, setIsLoading] = useState(true);

  const CHECKOUT_URL = 'https://buy.stripe.com/your-checkout-link-here';

  const images = [
    'https://mavigadget.com/cdn/shop/files/image_2025-04-05_135816377.png?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/main-image-1_bdca6f79-1aac-4b48-9eaa-9c29618422a9.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/ba9d1cdf-527f-4e54-a9c2-d14596d0112d.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/product-image-1713887026-sw.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/main-image-2_ef593cae-f108-445f-afa7-f7db3f41cbf8.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/product-image-1706746977-sw.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/product-image-1706746970-sw.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/product-image-1706746967-sw.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/product-image-1706746969-sw.jpg?v=1761046253&width=1400',
    'https://mavigadget.com/cdn/shop/files/product-image-1706746971-sw.jpg?v=1761046253&width=1400',
  ];

  const translations = {
    en: { title: 'Portable Wireless Alarm Door Stopper', soldBy: 'Sold by: Cool Shop', price: '$14.95', reviews: 'reviews', quantity: 'Quantity', buyNow: 'Buy Now', shipping: 'Free expedited shipping to', shippingDates: 'order today, get it between', trustedBy: 'Trusted by millions', subscribers: 'Over 40K+ subscribers', trustText: 'Join a community that trusts our reviews and exclusive offers.', followYoutube: 'Follow us on YouTube', moneyBack: 'Money-Back Guarantee', moneyBackText: 'Full refund if damaged or not as described', securePayment: '100% Secure Payment', securePaymentText: 'Your payment information is processed securely', description: 'Description', specifications: 'Specifications', customerReviews: 'Customer Reviews', basedOn: 'Based on', verified: 'Verified Purchase', helpful: 'Helpful', and: 'and' },
    pt: { title: 'Trava de Porta com Alarme Sem Fio Portátil', soldBy: 'Vendido por: Cool Shop', price: 'R$ 89,90', reviews: 'avaliações', quantity: 'Quantidade', buyNow: 'Comprar Agora', shipping: 'Frete expresso grátis para', shippingDates: 'peça hoje, receba entre', trustedBy: 'Confiado por milhões', subscribers: 'Mais de 40 mil inscritos', trustText: 'Junte-se a uma comunidade que confia em nossas análises e ofertas exclusivas.', followYoutube: 'Siga-nos no YouTube', moneyBack: 'Garantia de Devolução do Dinheiro', moneyBackText: 'Reembolso total se danificado ou não conforme descrito', securePayment: 'Pagamento 100% Seguro', securePaymentText: 'Suas informações de pagamento são processadas com segurança', description: 'Descrição', specifications: 'Especificações', customerReviews: 'Avaliações de Clientes', basedOn: 'Baseado em', verified: 'Compra Verificada', helpful: 'Útil', and: 'e' },
    es: { title: 'Tope de Puerta con Alarma Inalámbrica Portátil', soldBy: 'Vendido por: Cool Shop', price: '€14,95', reviews: 'reseñas', quantity: 'Cantidad', buyNow: 'Comprar Ahora', shipping: 'Envío express gratis a', shippingDates: 'pide hoy, recíbelo entre', trustedBy: 'Confiado por millones', subscribers: 'Más de 40 mil suscriptores', trustText: 'Únete a una comunidad que confía en nuestras reseñas y ofertas exclusivas.', followYoutube: 'Síguenos en YouTube', moneyBack: 'Garantía de Devolución de Dinero', moneyBackText: 'Reembolso completo si está dañado o no coincide con la descripción', securePayment: 'Pago 100% Seguro', securePaymentText: 'Tu información de pago se procesa de forma segura', description: 'Descripción', specifications: 'Especificaciones', customerReviews: 'Opiniones de Clientes', basedOn: 'Basado en', verified: 'Compra Verificada', helpful: 'Útil', and: 'y' },
    fr: { title: 'Butoir de Porte avec Alarme Sans Fil Portable', soldBy: 'Vendu par: Cool Shop', price: '€14,95', reviews: 'avis', quantity: 'Quantité', buyNow: 'Acheter Maintenant', shipping: 'Livraison express gratuite vers', shippingDates: 'commandez aujourd\'hui, recevez entre', trustedBy: 'Approuvé par des millions', subscribers: 'Plus de 40 000 abonnés', trustText: 'Rejoignez une communauté qui fait confiance à nos avis et offres exclusives.', followYoutube: 'Suivez-nous sur YouTube', moneyBack: 'Garantie Satisfait ou Remboursé', moneyBackText: 'Remboursement complet si endommagé ou non conforme', securePayment: 'Paiement 100% Sécurisé', securePaymentText: 'Vos informations de paiement sont traitées en toute sécurité', description: 'Description', specifications: 'Spécifications', customerReviews: 'Avis Clients', basedOn: 'Basé sur', verified: 'Achat Vérifié', helpful: 'Utile', and: 'et' },
    de: { title: 'Tragbarer Kabelloser Alarm-Türstopper', soldBy: 'Verkauft von: Cool Shop', price: '€14,95', reviews: 'Bewertungen', quantity: 'Menge', buyNow: 'Jetzt Kaufen', shipping: 'Kostenloser Expressversand nach', shippingDates: 'Heute bestellen, erhalten zwischen', trustedBy: 'Von Millionen vertraut', subscribers: 'Über 40.000 Abonnenten', trustText: 'Treten Sie einer Community bei, die unseren Bewertungen und exklusiven Angeboten vertraut.', followYoutube: 'Folgen Sie uns auf YouTube', moneyBack: 'Geld-zurück-Garantie', moneyBackText: 'Volle Rückerstattung bei Beschädigung oder nicht wie beschrieben', securePayment: '100% Sichere Zahlung', securePaymentText: 'Ihre Zahlungsinformationen werden sicher verarbeitet', description: 'Beschreibung', specifications: 'Spezifikationen', customerReviews: 'Kundenbewertungen', basedOn: 'Basierend auf', verified: 'Verifizierter Kauf', helpful: 'Hilfreich', and: 'und' },
    it: { title: 'Fermaporta con Allarme Wireless Portatile', soldBy: 'Venduto da: Cool Shop', price: '€14,95', reviews: 'recensioni', quantity: 'Quantità', buyNow: 'Acquista Ora', shipping: 'Spedizione express gratuita per', shippingDates: 'ordina oggi, ricevi tra', trustedBy: 'Affidabile da milioni', subscribers: 'Oltre 40.000 iscritti', trustText: 'Unisciti a una comunità che si fida delle nostre recensioni e offerte esclusive.', followYoutube: 'Seguici su YouTube', moneyBack: 'Garanzia Soddisfatti o Rimborsati', moneyBackText: 'Rimborso completo se danneggiato o non come descritto', securePayment: 'Pagamento 100% Sicuro', securePaymentText: 'Le tue informazioni di pagamento sono elaborate in modo sicuro', description: 'Descrizione', specifications: 'Specifiche', customerReviews: 'Recensioni Clienti', basedOn: 'Basato su', verified: 'Acquisto Verificato', helpful: 'Utile', and: 'e' },
    nl: { title: 'Draagbare Draadloze Alarm Deurstopper', soldBy: 'Verkocht door: Cool Shop', price: '€14,95', reviews: 'beoordelingen', quantity: 'Aantal', buyNow: 'Nu Kopen', shipping: 'Gratis expresverzending naar', shippingDates: 'bestel vandaag, ontvang tussen', trustedBy: 'Vertrouwd door miljoenen', subscribers: 'Meer dan 40.000 abonnees', trustText: 'Word lid van een community die onze beoordelingen en exclusieve aanbiedingen vertrouwt.', followYoutube: 'Volg ons op YouTube', moneyBack: 'Geld-terug-garantie', moneyBackText: 'Volledige terugbetaling bij beschadiging of niet zoals beschreven', securePayment: '100% Veilige Betaling', securePaymentText: 'Uw betalingsinformatie wordt veilig verwerkt', description: 'Beschrijving', specifications: 'Specificaties', customerReviews: 'Klantbeoordelingen', basedOn: 'Gebaseerd op', verified: 'Geverifieerde Aankoop', helpful: 'Nuttig', and: 'en' },
    ru: { title: 'Портативный Беспроводной Сигнальный Дверной Стопор', soldBy: 'Продавец: Cool Shop', price: '₽1,490', reviews: 'отзывов', quantity: 'Количество', buyNow: 'Купить Сейчас', shipping: 'Бесплатная экспресс-доставка в', shippingDates: 'закажите сегодня, получите между', trustedBy: 'Доверяют миллионы', subscribers: 'Более 40 000 подписчиков', trustText: 'Присоединяйтесь к сообществу, которое доверяет нашим обзорам и эксклюзивным предложениям.', followYoutube: 'Подписывайтесь на YouTube', moneyBack: 'Гарантия Возврата Денег', moneyBackText: 'Полный возврат средств при повреждении или несоответствии описанию', securePayment: '100% Безопасная Оплата', securePaymentText: 'Ваша платежная информация обрабатывается безопасно', description: 'Описание', specifications: 'Характеристики', customerReviews: 'Отзывы Покупателей', basedOn: 'На основе', verified: 'Подтвержденная Покупка', helpful: 'Полезно', and: 'и' },
    ja: { title: 'ポータブルワイヤレスアラームドアストッパー', soldBy: '販売者: Cool Shop', price: '¥2,200', reviews: 'レビュー', quantity: '数量', buyNow: '今すぐ購入', shipping: '無料特急配送先', shippingDates: '今日注文、到着予定', trustedBy: '何百万人もの信頼', subscribers: '40,000人以上の登録者', trustText: 'レビューと限定オファーを信頼するコミュニティに参加してください。', followYoutube: 'YouTubeでフォロー', moneyBack: '返金保証', moneyBackText: '破損または説明と異なる場合は全額返金', securePayment: '100%安全な支払い', securePaymentText: 'お支払い情報は安全に処理されます', description: '説明', specifications: '仕様', customerReviews: 'カスタマーレビュー', basedOn: 'に基づく', verified: '確認済み購入', helpful: '役に立った', and: 'と' },
    zh: { title: '便携式无线报警门挡', soldBy: '卖家：Cool Shop', price: '¥98', reviews: '评论', quantity: '数量', buyNow: '立即购买', shipping: '免费快递至', shippingDates: '今天订购，预计到达', trustedBy: '数百万人信赖', subscribers: '超过40,000订阅者', trustText: '加入信任我们评论和独家优惠的社区。', followYoutube: '在YouTube上关注我们', moneyBack: '退款保证', moneyBackText: '如有损坏或与描述不符，全额退款', securePayment: '100%安全支付', securePaymentText: '您的支付信息被安全处理', description: '描述', specifications: '规格', customerReviews: '客户评论', basedOn: '基于', verified: '已验证购买', helpful: '有用', and: '和' },
    ko: { title: '휴대용 무선 알람 도어 스토퍼', soldBy: '판매자: Cool Shop', price: '₩18,900', reviews: '리뷰', quantity: '수량', buyNow: '지금 구매', shipping: '무료 특급 배송', shippingDates: '오늘 주문, 도착 예정', trustedBy: '수백만 명이 신뢰', subscribers: '40,000명 이상의 구독자', trustText: '리뷰와 독점 제안을 신뢰하는 커뮤니티에 가입하세요.', followYoutube: 'YouTube에서 팔로우', moneyBack: '환불 보증', moneyBackText: '손상되거나 설명과 다를 경우 전액 환불', securePayment: '100% 안전한 결제', securePaymentText: '결제 정보는 안전하게 처리됩니다', description: '설명', specifications: '사양', customerReviews: '고객 리뷰', basedOn: '기준', verified: '인증된 구매', helpful: '도움이 됨', and: '및' },
    ar: { title: 'سدادة باب إنذار لاسلكية محمولة', soldBy: 'يباع بواسطة: Cool Shop', price: '$14.95', reviews: 'تقييمات', quantity: 'الكمية', buyNow: 'اشتري الآن', shipping: 'شحن سريع مجاني إلى', shippingDates: 'اطلب اليوم، احصل عليه بين', trustedBy: 'موثوق به من الملايين', subscribers: 'أكثر من 40 ألف مشترك', trustText: 'انضم إلى مجتمع يثق بمراجعاتنا وعروضنا الحصرية.', followYoutube: 'تابعنا على يوتيوب', moneyBack: 'ضمان استرداد الأموال', moneyBackText: 'استرداد كامل إذا كان تالفًا أو غير مطابق للوصف', securePayment: 'دفع آمن 100٪', securePaymentText: 'يتم معالجة معلومات الدفع الخاصة بك بشكل آمن', description: 'الوصف', specifications: 'المواصفات', customerReviews: 'تقييمات العملاء', basedOn: 'بناء على', verified: 'شراء موثق', helpful: 'مفيد', and: 'و' },
    tr: { title: 'Taşınabilir Kablosuz Alarmli Kapi Stoperi', soldBy: 'Satan: Cool Shop', price: '₺499', reviews: 'yorumlar', quantity: 'Miktar', buyNow: 'Şimdi Satın Al', shipping: 'Ücretsiz ekspres kargo', shippingDates: 'bugün sipariş ver, arasında al', trustedBy: 'Milyonlarca kişi tarafından güvenilir', subscribers: '40.000\'den fazla abone', trustText: 'İncelemelerimize ve özel tekliflerimize güvenen bir topluluğa katılın.', followYoutube: 'YouTube\'da Takip Edin', moneyBack: 'Para İade Garantisi', moneyBackText: 'Hasarlı veya açıklandığı gibi değilse tam iade', securePayment: '%100 Güvenli Ödeme', securePaymentText: 'Ödeme bilgileriniz güvenli bir şekilde işlenir', description: 'Açıklama', specifications: 'Özellikler', customerReviews: 'Müşteri Yorumları', basedOn: 'Temelinde', verified: 'Doğrulanmış Alış', helpful: 'Yararlı', and: 've' },
    pl: { title: 'Przenośny Bezprzewodowy Alarm Blokada Drzwi', soldBy: 'Sprzedawca: Cool Shop', price: '69 zł', reviews: 'recenzje', quantity: 'Ilość', buyNow: 'Kup Teraz', shipping: 'Darmowa przesyłka ekspresowa do', shippingDates: 'zamów dziś, otrzymaj między', trustedBy: 'Zaufane przez miliony', subscribers: 'Ponad 40 000 subskrybentów', trustText: 'Dołącz do społeczności, która ufa naszym recenzjom i ekskluzywnym ofertom.', followYoutube: 'Śledź nas na YouTube', moneyBack: 'Gwarancja Zwrotu Pieniędzy', moneyBackText: 'Pełny zwrot w przypadku uszkodzenia lub niezgodności z opisem', securePayment: '100% Bezpieczna Płatność', securePaymentText: 'Twoje informacje płatnicze są bezpiecznie przetwarzane', description: 'Opis', specifications: 'Specyfikacje', customerReviews: 'Recenzje Klientów', basedOn: 'Na podstawie', verified: 'Zweryfikowany Zakup', helpful: 'Pomocne', and: 'i' },
    sv: { title: 'Bärbar Trådlös Larmdörrstopp', soldBy: 'Såld av: Cool Shop', price: '149 kr', reviews: 'recensioner', quantity: 'Antal', buyNow: 'Köp Nu', shipping: 'Gratis expressleverans till', shippingDates: 'beställ idag, få det mellan', trustedBy: 'Betrodd av miljoner', subscribers: 'Över 40 000 prenumeranter', trustText: 'Gå med i ett community som litar på våra recensioner och exklusiva erbjudanden.', followYoutube: 'Följ oss på YouTube', moneyBack: 'Pengarna-tillbaka-garanti', moneyBackText: 'Full återbetalning om skadad eller ej som beskrivet', securePayment: '100% Säker Betalning', securePaymentText: 'Din betalningsinformation behandlas säkert', description: 'Beskrivning', specifications: 'Specifikationer', customerReviews: 'Kundrecensioner', basedOn: 'Baserad på', verified: 'Verifierat Köp', helpful: 'Hjälpsam', and: 'och' },
    no: { title: 'Bærbar Trådløs Alarm Dør Stopper', soldBy: 'Solgt av: Cool Shop', price: '149 kr', reviews: 'anmeldelser', quantity: 'Antall', buyNow: 'Kjøp Nå', shipping: 'Gratis ekspress frakt til', shippingDates: 'bestill i dag, motta mellom', trustedBy: 'Betrodd av millioner', subscribers: 'Over 40 000 abonnenter', trustText: 'Bli med i et samfunn som stoler på våre anmeldelser og eksklusive tilbud.', followYoutube: 'Følg oss på YouTube', moneyBack: 'Pengene-tilbake-garanti', moneyBackText: 'Full refusjon hvis skadet eller ikke som beskrevet', securePayment: '100% Sikker Betaling', securePaymentText: 'Betalingsinformasjonen din behandles trygt', description: 'Beskrivelse', specifications: 'Spesifikasjoner', customerReviews: 'Kundeanmeldelser', basedOn: 'Basert på', verified: 'Verifisert Kjøp', helpful: 'Nyttig', and: 'og' },
    da: { title: 'Bærbar Trådløs Alarm Dørstopper', soldBy: 'Solgt af: Cool Shop', price: '109 kr', reviews: 'anmeldelser', quantity: 'Antal', buyNow: 'Køb Nu', shipping: 'Gratis ekspresforsendelse til', shippingDates: 'bestil i dag, modtag mellem', trustedBy: 'Betroet af millioner', subscribers: 'Over 40.000 abonnenter', trustText: 'Bliv en del af et fællesskab, der stoler på vores anmeldelser og eksklusive tilbud.', followYoutube: 'Følg os på YouTube', moneyBack: 'Pengene-tilbage-garanti', moneyBackText: 'Fuld refusion hvis beskadiget eller ikke som beskrevet', securePayment: '100% Sikker Betaling', securePaymentText: 'Dine betalingsoplysninger behandles sikkert', description: 'Beskrivelse', specifications: 'Specifikationer', customerReviews: 'Kundeanmeldelser', basedOn: 'Baseret på', verified: 'Verificeret Køb', helpful: 'Nyttigt', and: 'og' },
    fi: { title: 'Kannettava Langaton Hälytys Ovistopper', soldBy: 'Myyjä: Cool Shop', price: '14,95 €', reviews: 'arvostelut', quantity: 'Määrä', buyNow: 'Osta Nyt', shipping: 'Ilmainen pikakuorm', shippingDates: 'tilaa tänään, saat välillä', trustedBy: 'Miljoonien luottamus', subscribers: 'Yli 40 000 tilaajaa', trustText: 'Liity yhteisöön, joka luottaa arvosteluihimme ja eksklusiivisiin tarjouksiin.', followYoutube: 'Seuraa YouTubessa', moneyBack: 'Rahat takaisin -takuu', moneyBackText: 'Täysi palautus, jos vaurioitunut tai ei kuvausta vastaava', securePayment: '100% Turvallinen Maksu', securePaymentText: 'Maksutietosi käsitellään turvallisesti', description: 'Kuvaus', specifications: 'Tekniset tiedot', customerReviews: 'Asiakasarvostelut', basedOn: 'Perustuu', verified: 'Vahvistettu Osto', helpful: 'Hyödyllinen', and: 'ja' },
    hi: { title: 'पोर्टेबल वायरलेस अलार्म दरवाजा स्टॉपर', soldBy: 'विक्रेता: Cool Shop', price: '₹1,249', reviews: 'समीक्षाएं', quantity: 'मात्रा', buyNow: 'अभी खरीदें', shipping: 'मुफ्त एक्सप्रेस शिपिंग', shippingDates: 'आज ऑर्डर करें, के बीच प्राप्त करें', trustedBy: 'लाखों द्वारा विश्वसनीय', subscribers: '40,000+ सब्सक्राइबर्स', trustText: 'एक ऐसे समुदाय में शामिल हों जो हमारी समीक्षाओं और विशेष ऑफ़र पर भरोसा करता है।', followYoutube: 'YouTube पर फॉलो करें', moneyBack: 'मनी-बैक गारंटी', moneyBackText: 'क्षतिग्रस्त या वर्णन के अनुसार नहीं होने पर पूर्ण रिफंड', securePayment: '100% सुरक्षित भुगतान', securePaymentText: 'आपकी भुगतान जानकारी सुरक्षित रूप से संसाधित की जाती है', description: 'विवरण', specifications: 'विशेषताएं', customerReviews: 'ग्राहक समीक्षाएं', basedOn: 'पर आधारित', verified: 'सत्यापित खरीद', helpful: 'उपयोगी', and: 'और' },
  };

  const reviews = [
    { name: 'Sarah Johnson', rating: 5, date: '2 days ago', text: 'Excellent product! I feel much safer when I travel. The alarm is very loud and worked perfectly when I tested it.', verified: true, helpful: 24, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    { name: 'John Smith', rating: 5, date: '5 days ago', text: 'Bought this for my mom who lives alone. She loves it! Easy to use and very effective.', verified: true, helpful: 18 },
    { name: 'Emily Davis', rating: 5, date: '1 week ago', text: 'Product arrived quickly and very well packaged. Excellent quality, highly recommend!', verified: true, helpful: 31, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
    { name: 'Michael Brown', rating: 4, date: '1 week ago', text: 'Very good! Only downside is batteries not included, but otherwise perfect.', verified: true, helpful: 12 },
    { name: 'Jessica Wilson', rating: 5, date: '2 weeks ago', text: 'Amazing! Use it in hotel rooms whenever I travel for work. Worth every penny.', verified: true, helpful: 28, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
    { name: 'David Martinez', rating: 5, date: '2 weeks ago', text: 'Bought 3 units, one for me and two as gifts. Everyone loved it!', verified: true, helpful: 15 },
    { name: 'Amanda Taylor', rating: 5, date: '3 weeks ago', text: 'Incredible product! The alarm sound really scares anyone. I feel much more protected.', verified: true, helpful: 42 },
    { name: 'Christopher Lee', rating: 5, date: '3 weeks ago', text: 'Excellent value for money. Works perfectly and the quality is surprising.', verified: true, helpful: 19 },
    { name: 'Jennifer Anderson', rating: 5, date: '1 month ago', text: 'Highly recommend! Very useful for frequent travelers or people living alone.', verified: true, helpful: 35, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
    { name: 'Robert Thomas', rating: 4, date: '1 month ago', text: 'Good product, serves its purpose well. Very sensitive sensor.', verified: true, helpful: 9 },
    { name: 'Lisa Garcia', rating: 5, date: '1 month ago', text: 'Love it! Compact, efficient and very easy to install. No tools needed.', verified: true, helpful: 26 },
    { name: 'James Rodriguez', rating: 5, date: '1 month ago', text: 'Quality product! The alarm is really loud. Great purchase.', verified: true, helpful: 14 },
    { name: 'Mary Hernandez', rating: 5, date: '2 months ago', text: 'Perfect! Use it in my apartment and feel much safer. Totally worth it!', verified: true, helpful: 38, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' },
    { name: 'Daniel Lopez', rating: 5, date: '2 months ago', text: 'Excellent! Works perfectly. Recommend to everyone.', verified: true, helpful: 21 },
    { name: 'Patricia Moore', rating: 5, date: '2 months ago', text: 'Amazing product! Tested it several times and always works. Highly recommend!', verified: true, helpful: 29 },
  ];

  useEffect(() => {
    try {
      const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase().split('-')[0];
      const supportedLangs = ['en', 'pt', 'es', 'fr', 'de', 'it', 'nl', 'ru', 'ja', 'zh', 'ko', 'ar', 'tr', 'pl', 'sv', 'no', 'da', 'fi', 'hi'];
      setUserLanguage(supportedLangs.includes(browserLang) ? browserLang : 'en');
      
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => setUserCountry(data.country_name || 'United States'))
        .catch(() => {});
    } catch (e) {
      setUserLanguage('en');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() + 10);
    const end = new Date(today);
    end.setDate(end.getDate() + 17);
    
    try {
      const fmt = (d) => d.toLocaleDateString(userLanguage === 'en' ? 'en-US' : userLanguage === 'pt' ? 'pt-BR' : userLanguage, { month: 'long', day: 'numeric' });
      setShippingDates({ start: fmt(start), end: fmt(end) });
    } catch (e) {
      setShippingDates({ start: 'November 22', end: 'November 29' });
    }
  }, [userLanguage]);

  const t = translations[userLanguage] || translations.en;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-[#1a4d8f] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">SECUREHOME®</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-xl">
              <img src={images[selectedImage]} alt={t.title} className="w-full h-full object-contain" />
              <button onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => setSelectedImage((selectedImage + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {images.slice(0, 10).map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-300'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{t.soldBy}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-lg font-semibold">4.9</span>
                <span className="text-gray-600">(234 {t.reviews})</span>
              </div>
              <div className="mb-8">
                <p className="text-4xl md:text-5xl font-bold text-gray-900">{t.price}</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.quantity}</label>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-12 w-12">-</Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-12 w-12">+</Button>
                </div>
              </div>
              <Button onClick={() => window.open(CHECKOUT_URL, '_blank')} className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                🔥 {t.buyNow}
              </Button>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">{t.shipping} <span className="font-bold">{userCountry}</span></p>
                    <p className="text-sm text-green-700">{t.shippingDates} <span className="font-semibold">{shippingDates.start}</span> {t.and} <span className="font-semibold">{shippingDates.end}</span></p>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">{t.moneyBack}</p>
                    <p className="text-sm text-blue-700">{t.moneyBackText}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Check className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-purple-900">{t.securePayment}</p>
                    <p className="text-sm text-purple-700">{t.securePaymentText}</p>
                  </div>
                </div>
              </div>
              <Card className="mt-6 p-6 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-600 p-3 rounded-full">
                    <Youtube className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase">{t.trustedBy}</p>
                    <p className="text-2xl font-bold text-gray-900">{t.subscribers}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{t.trustText}</p>
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white" onClick={() => window.open('https://youtube.com/@yourchannel', '_blank')}>
                  {t.followYoutube}
                </Button>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t.description}</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg">The Portable Wireless Alarm Door Stopper is the perfect solution for anyone seeking additional security at home, hotels, or any environment. With an ultra-sensitive motion sensor, this device emits a loud 120dB alarm when it detects any attempt to open the door.</p>
              <h3 className="text-xl font-bold mt-6 mb-3">Key Features:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Loud 120dB Alarm:</strong> Penetrating sound that scares intruders and alerts you immediately</li>
                <li><strong>Portable and Compact:</strong> Easy to transport for travel and use in different locations</li>
                <li><strong>No Installation Required:</strong> No drilling or tools needed, simply position on the door</li>
                <li><strong>Vibration Sensor:</strong> Detects any movement or pressure on the door</li>
                <li><strong>Energy Efficient:</strong> Operates with 1x 9V battery (not included)</li>
                <li><strong>Non-Slip Design:</strong> Rubber base keeps the device firmly in place</li>
                <li><strong>Adjustable Alarm Mode:</strong> Set the alarm duration according to your preference</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">{t.specifications}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg"><p className="font-semibold text-gray-900">Alarm Volume</p><p className="text-gray-600">120dB</p></div>
              <div className="p-4 border rounded-lg"><p className="font-semibold text-gray-900">Power Supply</p><p className="text-gray-600">1x 9V Battery (not included)</p></div>
              <div className="p-4 border rounded-lg"><p className="font-semibold text-gray-900">Material</p><p className="text-gray-600">ABS + Non-Slip Rubber</p></div>
              <div className="p-4 border rounded-lg"><p className="font-semibold text-gray-900">Dimensions</p><p className="text-gray-600">12 x 7 x 3.5 cm</p></div>
              <div className="p-4 border rounded-lg"><p className="font-semibold text-gray-900">Weight</p><p className="text-gray-600">150g</p></div>
              <div className="p-4 border rounded-lg"><p className="font-semibold text-gray-900">Color</p><p className="text-gray-600">Black/Silver</p></div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">{t.customerReviews}</h2>
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold">4.9</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-600">{t.basedOn} 234 {t.reviews}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    {review.image ? (
                      <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">{review.name.charAt(0)}</div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        {review.verified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <Check className="w-3 h-3 mr-1" />{t.verified}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-gray-700 mb-3">{review.text}</p>
                      <button className="text-sm text-gray-500 hover:text-gray-700">{t.helpful} ({review.helpful})</button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div><h3 className="text-xl font-bold mb-4">SECUREHOME®</h3><p className="text-gray-400">Your security is our priority. Quality products with full guarantee.</p></div>
            <div><h4 className="font-semibold mb-4">Customer Service</h4><ul className="space-y-2 text-gray-400"><li className="hover:text-white cursor-pointer">FAQ</li><li className="hover:text-white cursor-pointer">Return Policy</li><li className="hover:text-white cursor-pointer">Warranty</li><li className="hover:text-white cursor-pointer">Contact</li></ul></div>
            <div><h4 className="font-semibold mb-4">Information</h4><ul className="space-y-2 text-gray-400"><li className="hover:text-white cursor-pointer">About Us</li><li className="hover:text-white cursor-pointer">Shipping</li><li className="hover:text-white cursor-pointer">Terms</li><li className="hover:text-white cursor-pointer">Privacy</li></ul></div>
            <div><h4 className="font-semibold mb-4">Social Media</h4><ul className="space-y-2 text-gray-400"><li className="flex items-center gap-2 hover:text-white cursor-pointer"><Youtube className="w-5 h-5" />YouTube (40K)</li></ul></div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400"><p>© 2024 SecureHome. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}