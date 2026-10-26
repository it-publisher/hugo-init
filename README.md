# hugo-init

Тема Hugo для русскоязычного блога. Форк [Nimbus](https://github.com/k-s-pavan-kumar/hugo-nimbus)
(коммит `832d53c`), лицензия MIT — `LICENSE` автора сохранён.

- лента — карточки с обложкой;
- оглавление для длинных заметок;
- поиск по сайту с русской морфологией, без внешних сервисов;
- кнопка «Копировать» на каждом блоке кода, подсветка с подписью языка;
- галереи из нескольких картинок, без зависимостей;
- «Поделиться»: Телеграм, ВКонтакте, ссылка, системное меню на телефоне;
- похожие заметки по общим тегам;
- светлая и тёмная тема, кириллица в шрифте Inter;
- никаких внешних запросов: шрифты, скрипты и поиск лежат в теме.

---

## Подключение

```bash
git submodule add https://github.com/it-publisher/hugo-init.git themes/init
```

Минимальный `hugo.toml`:

```toml
theme = "init"
defaultContentLanguage = "ru"

# json на главной — индекс для поиска
[outputs]
  home = ["html", "json"]
  section = ["html", "rss"]

# Таксономию раздела называть <раздел>tags: по имени страница тега
# находит свой раздел, а лента раздела — свои теги
[taxonomies]
  blogtag = "blogtags"

[params]
  author = "Имя Автора"
  description = "Описание сайта"
  avatar = "/images/avatar.jpg"
  images = ["/images/preview.jpg"]   # превью ссылок по умолчанию
  search = true
  toc = true
  copyCodeButton = true
  [params.highlight]
    style = "github"
  [params.social]
    telegram = "https://t.me/channel"   # необязательно

[[menu.main]]
  name = "Блог"
  url = "/blog/"

[markup.highlight]
  noClasses = false   # подсветка классами — для тёмной темы
  lineNos = false     # иначе копирование возьмёт номера строк
```

«Похожие заметки» работают по таксономиям из `[related]`, см.
[документацию Hugo](https://gohugo.io/content-management/related-content/).

---

## Заметки

**Обложка** карточки и превью ссылки — поле `cover`. Без него берётся первая
картинка заметки.

```yaml
cover: "/images/cover.png"
```

**Галерея** — несколько `<img>` в одном `<figure>`:

```html
<figure>
<img src="/images/1.jpg" alt="">
<img src="/images/2.jpg" alt="">
<figcaption>Подпись</figcaption>
</figure>
```

**Код** — у любого блока кнопка «Копировать», у блока с языком (` ```bash `) —
подсветка и подпись.

Шорткоды: `note` (врезка), `terminal`, `code-tabs` (вкладки с вариантами кода),
`diff`, `badge` — см. `layouts/shortcodes/`.

---

## Стили

Tailwind 3 собран заранее в `assets/css/tailwind.built.css` — для сборки сайта
Node и Tailwind не нужны. Пересобирать — только после правки классов в шаблонах:

```bash
themes/init/build-css.sh
```

Скрипту нужен [standalone Tailwind CLI](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.17)
v3.4.17 (один файл, плагин typography встроен): положить в `.tools/tailwindcss`
в корне сайта или указать путь в переменной `TAILWIND`. Свои стили без
Tailwind — в `assets/css/custom.css`.

---

## Сторонние компоненты

| Что | Лицензия |
|---|---|
| [Nimbus](https://github.com/k-s-pavan-kumar/hugo-nimbus) — основа темы | MIT |
| [Lunr](https://lunrjs.com/) 2.3.9 | MIT |
| [lunr-languages](https://github.com/MihaiValentin/lunr-languages) 1.14.0 — русский стемминг | MPL 1.1 |
| [Inter](https://rsms.me/inter/) через fontsource 5.2.6 | OFL 1.1 |
