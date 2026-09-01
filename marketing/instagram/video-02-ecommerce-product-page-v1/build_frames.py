from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent
ASSETS = ROOT / "assets"
OUT = ROOT / "frames"
W, H = 690, 1382
NAVY = (4, 20, 54)
INK = (23, 27, 37)
MUTED = (102, 108, 122)
CYAN = (26, 196, 224)
PURPLE = (73, 82, 255)
BG = (248, 246, 243)


def font(size, bold=False):
    name = "seguisb.ttf" if bold else "segoeui.ttf"
    return ImageFont.truetype(str(Path("C:/Windows/Fonts") / name), size)


def fit(im, box, contain=True):
    x0, y0, x1, y1 = box
    iw, ih = im.size
    scale = min((x1-x0)/iw, (y1-y0)/ih) if contain else max((x1-x0)/iw, (y1-y0)/ih)
    nw, nh = int(iw*scale), int(ih*scale)
    r = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (x1-x0, y1-y0), "white")
    canvas.paste(r, ((canvas.width-nw)//2, (canvas.height-nh)//2))
    return canvas


def button(draw, box, label, gradient=False, fill=(20, 23, 31), outline=None):
    x0,y0,x1,y1=box
    if gradient:
        layer=Image.new("RGB",(x1-x0,y1-y0))
        p=layer.load()
        for x in range(layer.width):
            t=x/max(1,layer.width-1)
            c=tuple(int(PURPLE[i]*(1-t)+CYAN[i]*t) for i in range(3))
            for y in range(layer.height): p[x,y]=c
        mask=Image.new("L",layer.size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,*layer.size),radius=18,fill=255)
        draw._image.paste(layer,(x0,y0),mask)
    else:
        draw.rounded_rectangle(box, radius=18, fill=fill, outline=outline, width=2 if outline else 1)
    f=font(25,True); b=draw.textbbox((0,0),label,font=f)
    draw.text(((x0+x1-b[2])/2,(y0+y1-b[3])/2-2),label,font=f,fill="white" if fill!=(255,255,255) or gradient else INK)


def product_photo(box, result=True):
    p = ASSETS / ("mauve-dress-result.png" if result else "customer-upload-photo.png")
    return fit(Image.open(p).convert("RGB"), box)


def brand_header(im, title="AURELIA"):
    d=ImageDraw.Draw(im); d.rectangle((0,0,W,116),fill="white")
    d.text((42,34),title,font=font(38,True),fill=INK)
    d.line((42,92,648,92),fill=(225,225,228),width=2)
    d.ellipse((600,35,634,69),outline=INK,width=3)


def tif_header(im):
    d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,H),fill=NAVY)
    logo=Image.open(ASSETS/"try-instant-fit-logo-white.png").convert("RGBA")
    logo.thumbnail((355,105),Image.Resampling.LANCZOS)
    im.paste(logo,((W-logo.width)//2,40),logo)


def product_strip(im, y=172):
    d=ImageDraw.Draw(im)
    im.paste(product_photo((38,y,175,y+210)),(38,y))
    d.text((200,y+8),"Mauve Wrap Maxi Dress",font=font(31,True),fill=INK)
    d.text((200,y+55),"Modest Western Collection",font=font(23),fill=MUTED)
    d.text((200,y+98),"$129",font=font(29,True),fill=INK)


def frame_online():
    im=Image.new("RGB",(W,H),BG); brand_header(im)
    d=ImageDraw.Draw(im)
    d.text((42,145),"NEW SEASON",font=font(24,True),fill=(132,91,102))
    d.text((42,190),"Refined modest dressing",font=font(43,True),fill=INK)
    d.text((42,248),"Designed for modern everyday elegance.",font=font(25),fill=MUTED)
    hero=product_photo((42,330,648,1040)); im.paste(hero,(42,330))
    button(d,(42,1080,648,1160),"SHOP THE COLLECTION",fill=INK)
    return im


def frame_listing(selected=False):
    im=Image.new("RGB",(W,H),BG); brand_header(im)
    d=ImageDraw.Draw(im); d.text((42,135),"MODEST DRESSES",font=font(34,True),fill=INK)
    cards=[(42,205,330,715),(360,205,648,715),(42,750,330,1260),(360,750,648,1260)]
    colors=[(233,221,216),(229,225,218),(220,226,232),(230,219,227)]
    for i,b in enumerate(cards):
        d.rounded_rectangle(b,radius=12,fill="white",outline=(218,218,220),width=2)
        if i==0: im.paste(product_photo((b[0]+10,b[1]+10,b[2]-10,b[3]-115)),(b[0]+10,b[1]+10))
        else:
            d.rectangle((b[0]+10,b[1]+10,b[2]-10,b[3]-115),fill=colors[i])
            d.rounded_rectangle((b[0]+75,b[1]+80,b[2]-75,b[3]-155),radius=55,fill=(185-i*12,157+i*10,166+i*7))
        name="Mauve Wrap Maxi Dress" if i==0 else ["Stone Pleated Midi","Navy Column Dress","Rose Belted Dress"][i-1]
        d.text((b[0]+14,b[3]-95),name,font=font(20,True),fill=INK)
        d.text((b[0]+14,b[3]-58),"$129" if i==0 else "$118",font=font(21),fill=MUTED)
    if selected: d.rounded_rectangle((35,198,337,722),radius=16,outline=CYAN,width=7)
    return im


def frame_product(tap=False):
    im=Image.new("RGB",(W,H),BG); brand_header(im)
    d=ImageDraw.Draw(im); photo=product_photo((42,135,648,770)); im.paste(photo,(42,135))
    d.text((42,805),"Mauve Wrap Maxi Dress",font=font(37,True),fill=INK)
    d.text((42,860),"$129",font=font(31,True),fill=INK)
    d.text((42,910),"Long sleeves · Ankle length · Soft drape",font=font(22),fill=MUTED)
    d.text((42,960),"SELECT SIZE",font=font(20,True),fill=INK)
    for i,s in enumerate(["XS","S","M","L","XL"]):
        x=42+i*84; d.rounded_rectangle((x,995,x+66,1057),radius=12,fill="white",outline=(170,173,181),width=2); d.text((x+18,1011),s,font=font(21,True),fill=INK)
    button(d,(42,1090,648,1170),"TRY IT ON WITH TRY INSTANT FIT",gradient=True)
    button(d,(42,1190,648,1270),"ADD TO BAG",fill=INK)
    if tap:
        d.ellipse((574,1080,660,1180),outline=CYAN,width=6); d.ellipse((585,1091,649,1169),outline=(108,228,240),width=3)
    return im


def frame_redirect():
    im=Image.new("RGB",(W,H),NAVY); d=ImageDraw.Draw(im)
    d.rounded_rectangle((30,25,660,104),radius=28,fill=(245,246,249)); d.text((68,47),"tryinstantfit.com/try/aurelia",font=font(24),fill=INK)
    logo=Image.open(ASSETS/"try-instant-fit-logo.png").convert("RGBA"); logo.thumbnail((360,110)); im.paste(logo,((W-logo.width)//2,260),logo)
    d.arc((288,485,402,599),0,290,fill=CYAN,width=11)
    d.text((196,640),"Opening Try Instant Fit…",font=font(31,True),fill="white")
    d.text((220,690),"Mauve Wrap Maxi Dress",font=font(23),fill=(190,205,227))
    return im


def tif_card(mode):
    im=Image.new("RGB",(W,H),NAVY); tif_header(im); d=ImageDraw.Draw(im)
    if mode=="processing":
        d.arc((275,475,415,615),0,285,fill=CYAN,width=13)
        d.text((170,650),"Generating your try-on…",font=font(33,True),fill="white")
        d.text((210,708),"This usually takes 5–15 seconds.",font=font(22),fill=(210,219,236)); return im
    d.rounded_rectangle((28,150,662,1308),radius=30,fill="white")
    product_strip(im,178)
    d.text((190,408),"2 TRIES LEFT ON YOUR CODE",font=font(19,True),fill=(55,66,88))
    if mode=="add":
        d.text((225,505),"Add Your Photo",font=font(39,True),fill=INK)
        d.text((90,570),"Stand against a plain background, full body,",font=font(23),fill=MUTED)
        d.text((172,606),"facing forward for best results.",font=font(23),fill=MUTED)
        button(d,(70,715,320,845),"TAKE PHOTO",fill=(255,255,255),outline=(195,200,211))
        button(d,(370,715,620,845),"UPLOAD",gradient=True)
    else:
        title="Your Photo" if mode in ("uploaded","tap") else "Your Result"
        d.text((62,462),title,font=font(31,True),fill=INK)
        pic=product_photo((135,515,555,1110),result=mode in ("result","share","buy")); im.paste(pic,(135,515))
        if mode in ("uploaded","tap"):
            button(d,(62,1150,628,1235),"TRY IT ON",gradient=True)
            if mode=="tap": d.ellipse((525,1135,647,1255),outline=CYAN,width=7)
        elif mode=="result":
            button(d,(62,1135,290,1225),"SHARE",gradient=True); button(d,(310,1135,628,1225),"BUY THIS DRESS",fill=INK)
        elif mode=="share":
            button(d,(62,1135,290,1225),"SHARE",gradient=True); button(d,(310,1135,628,1225),"BUY THIS DRESS",fill=INK)
            d.rounded_rectangle((55,940,350,1135),radius=18,fill=(250,250,252),outline=(205,210,220),width=2)
            d.text((80,965),"Share result",font=font(24,True),fill=INK)
            d.ellipse((78,1018,126,1066),fill=(37,211,102)); d.text((140,1023),"WhatsApp",font=font(25,True),fill=INK)
            d.line((80,1087,320,1087),fill=(220,222,228),width=2); d.text((140,1093),"Copy link",font=font(23),fill=MUTED)
        elif mode=="buy":
            button(d,(62,1135,290,1225),"SHARE",gradient=True); button(d,(310,1135,628,1225),"BUY THIS DRESS",fill=INK)
            d.ellipse((498,1118,650,1260),outline=CYAN,width=7)
    return im


def whatsapp():
    im=Image.new("RGB",(W,H),(235,229,220)); d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,130),fill=(20,102,88)); d.ellipse((35,30,105,100),fill=(198,210,208)); d.text((130,38),"Sara",font=font(34,True),fill="white"); d.text((130,80),"online",font=font(20),fill=(214,239,233))
    d.rounded_rectangle((175,175,650,900),radius=24,fill=(220,248,211))
    pic=product_photo((205,205,620,760)); im.paste(pic,(205,205))
    d.text((205,790),"How does this look on me?",font=font(25),fill=INK)
    d.text((565,850),"10:42",font=font(18),fill=MUTED)
    d.rounded_rectangle((35,950,490,1050),radius=22,fill="white"); d.text((65,980),"It looks perfect — get it!",font=font(25),fill=INK)
    d.rounded_rectangle((25,1260,665,1350),radius=28,fill="white"); d.text((65,1285),"Message",font=font(24),fill=(145,150,160)); d.ellipse((590,1270,650,1330),fill=(20,102,88))
    return im


def checkout():
    im=Image.new("RGB",(W,H),BG); brand_header(im); d=ImageDraw.Draw(im)
    d.text((42,145),"CHECKOUT",font=font(36,True),fill=INK)
    im.paste(product_photo((42,215,290,650)),(42,215)); d.text((320,235),"Mauve Wrap",font=font(29,True),fill=INK); d.text((320,275),"Maxi Dress",font=font(29,True),fill=INK); d.text((320,330),"Size M",font=font(24),fill=MUTED); d.text((320,375),"$129",font=font(27,True),fill=INK)
    d.line((42,700,648,700),fill=(210,212,217),width=2); d.text((42,740),"Delivery",font=font(27,True),fill=INK); d.text((42,790),"Standard · 3–5 business days",font=font(23),fill=MUTED)
    d.line((42,860,648,860),fill=(210,212,217),width=2); d.text((42,900),"Total",font=font(28,True),fill=INK); d.text((555,900),"$129",font=font(28,True),fill=INK)
    button(d,(42,1010,648,1100),"COMPLETE PURCHASE",fill=INK)
    d.rounded_rectangle((175,1140,515,1210),radius=22,fill=(229,247,238)); d.text((217,1157),"✓  Ready to purchase",font=font(24,True),fill=(26,115,75))
    return im


def cta():
    im=Image.new("RGB",(W,H),NAVY); d=ImageDraw.Draw(im)
    logo=Image.open(ASSETS/"try-instant-fit-logo-white.png").convert("RGBA"); logo.thumbnail((410,135)); im.paste(logo,((W-logo.width)//2,300),logo)
    d.text((115,580),"Add virtual try-on",font=font(47,True),fill="white")
    d.text((142,650),"to your website.",font=font(47,True),fill=CYAN)
    d.rounded_rectangle((170,780,520,870),radius=24,fill=(255,255,255)); d.text((238,804),"GET STARTED",font=font(27,True),fill=NAVY)
    return im


def prepare_white_logo():
    src=Image.open(ASSETS/"try-instant-fit-logo-white-source.png").convert("RGBA")
    px=src.load()
    for y in range(src.height):
        for x in range(src.width):
            r,g,b,a=px[x,y]
            # Remove the solid black preview background while preserving white lettering.
            lum=max(r,g,b)
            alpha=0 if lum < 18 else min(255, max(a, (lum-18)*8))
            px[x,y]=(r,g,b,alpha)
    src.save(ASSETS/"try-instant-fit-logo-white.png")


def real_discovery_frame():
    src=Image.open(ASSETS/"real-customer-phone.jpg").convert("RGB")
    # Vertical editorial crop around the genuine photographed customer and phone.
    iw,ih=src.size; crop_w=int(ih*9/16); left=max(0,min(iw-crop_w,int(iw*.47)))
    src=src.crop((left,0,left+crop_w,ih)).resize((1080,1920),Image.Resampling.LANCZOS)
    # Privacy blur on the photographed face.
    box=(445,500,825,910)
    face=src.crop(box).filter(ImageFilter.GaussianBlur(30))
    mask=Image.new("L",face.size,0); ImageDraw.Draw(mask).ellipse((20,15,face.width-20,face.height-15),fill=255)
    mask=mask.filter(ImageFilter.GaussianBlur(22))
    src.paste(face,(box[0],box[1]),mask)
    return src


def composite(screen, outname):
    # Authentic screen-recording presentation: no generated hands, fake phone, or floating UI.
    screen.resize((1080,1920),Image.Resampling.LANCZOS).save(OUT/outname)


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    prepare_white_logo()
    screens=[
        (frame_online(),"01-online-fashion-discovery.png"),
        (frame_listing(),"02-product-listing.png"),
        (frame_listing(True),"03-select-mauve-dress.png"),
        (frame_product(),"04-brand-product-page.png"),
        (frame_product(True),"05-tap-try-instant-fit.png"),
        (frame_redirect(),"06-redirect-to-try-instant-fit.png"),
        (tif_card("add"),"07-real-add-photo.png"),
        (tif_card("uploaded"),"08-real-uploaded-photo.png"),
        (tif_card("tap"),"09-real-start-try-on.png"),
        (tif_card("processing"),"10-real-processing.png"),
        (tif_card("result"),"11-real-virtual-result.png"),
        (tif_card("share"),"12-share-dropdown-whatsapp.png"),
        (whatsapp(),"13-whatsapp-friend-recommendation.png"),
        (tif_card("buy"),"14-tap-buy-this-dress.png"),
        (checkout(),"15-return-brand-checkout.png"),
    ]
    # Frame 1 uses an untouched real lifestyle photograph instead of a generated person.
    real_discovery_frame().save(OUT/"01-online-fashion-discovery.png")
    for screen,name in screens[1:]: composite(screen,name)
    cta().resize((1080,1920),Image.Resampling.LANCZOS).save(OUT/"16-brand-cta.png")
    print(f"Created {len(screens)+1} frames in {OUT}")


if __name__=="__main__": main()
