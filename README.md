# Библиотека API

Находится по адресу: 
http://192.168.243.19:3001/

`PS: Понятное дело, работает только внутри нашей сети.`

- [Краткое описание](#summary)
- [Инструкция](#guide)

<a name="summary"></a> 
Краткое описание:
==================

Главная страница:
------------------

![Главная страница](https://downloader.disk.yandex.ru/preview/0305ca698da217fc060e9340545c2ee7f8a7305e6bccbd8b4e50278eba9d3816/637bb54b/KjiGTGREfQU7GkWv2zttswXbOtHfNLmO12_IYOxMrkgHfgkN1nt5lFEaZWnATK8cXKLq-bE_xnYXEPr2kkOl_w%3D%3D?uid=0&filename=instr1.bmp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048)

Страница сервиса (пример):
------------------
![Страница API](https://downloader.disk.yandex.ru/preview/0a897ed744f2af90348abd5cfe83becb7cf9c573246554b77f4f02bbe27c0e19/637bb585/FiAC76WtzlKBCgpm-nd6PQXbOtHfNLmO12_IYOxMrkjnPHrTtkYq2gr3M96r5xvFXg7_dxVUuhm9RnIzIfFKfg%3D%3D?uid=0&filename=instr2.bmp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048)

<a name="guide"></a> 
Инструкция
==================
1. Сделать описание сервиса ([editor.swagger.io](https://editor.swagger.io) и [SwagDefGen](https://roger13.github.io/SwagDefGen) в помощь)
2. Сохранить как файл .yaml
3. Залить результат в библиотеку

`В данной реализации предусмотрено только ручное добавление .yaml файлов.`
- Название импортируемого файла желательно писать на английском (если не стремаетесь корявого транслита в адресной строке, можно и на русском).
- Если добавить файл с идентичным названием, он перезапишет собой предыдущий.
- Если нужно удалить что-то, пишите хосту (может потом прикручу удаление, если загорится).
