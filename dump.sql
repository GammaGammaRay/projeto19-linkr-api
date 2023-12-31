PGDMP                         {            linkr    15.3    15.3 ,    1           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            2           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            3           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            4           1262    25037    linkr    DATABASE     |   CREATE DATABASE linkr WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE linkr;
                postgres    false            �            1259    25252    curtidas    TABLE     v   CREATE TABLE public.curtidas (
    id integer NOT NULL,
    author integer NOT NULL,
    "postId" integer NOT NULL
);
    DROP TABLE public.curtidas;
       public         heap    postgres    false            �            1259    25251    curtidas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.curtidas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.curtidas_id_seq;
       public          postgres    false    221            5           0    0    curtidas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.curtidas_id_seq OWNED BY public.curtidas.id;
          public          postgres    false    220            �            1259    25237    posts    TABLE     �   CREATE TABLE public.posts (
    id integer NOT NULL,
    author integer NOT NULL,
    link character varying(255) NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    25236    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    219            6           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    218            �            1259    25278 
   posts_tags    TABLE     y   CREATE TABLE public.posts_tags (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "tagId" integer NOT NULL
);
    DROP TABLE public.posts_tags;
       public         heap    postgres    false            �            1259    25277    posts_tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.posts_tags_id_seq;
       public          postgres    false    225            7           0    0    posts_tags_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.posts_tags_id_seq OWNED BY public.posts_tags.id;
          public          postgres    false    224            �            1259    25222    sessions    TABLE     �   CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(255),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    25221    sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    217            8           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    216            �            1259    25269    tags    TABLE     `   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    25268    tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public          postgres    false    223            9           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
          public          postgres    false    222            �            1259    25194    users    TABLE     )  CREATE TABLE public.users (
    id integer NOT NULL,
    "profileUrl" character varying(255),
    "userName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    hash character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    25193    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            :           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            �           2604    25255    curtidas id    DEFAULT     j   ALTER TABLE ONLY public.curtidas ALTER COLUMN id SET DEFAULT nextval('public.curtidas_id_seq'::regclass);
 :   ALTER TABLE public.curtidas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    25240    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    25281    posts_tags id    DEFAULT     n   ALTER TABLE ONLY public.posts_tags ALTER COLUMN id SET DEFAULT nextval('public.posts_tags_id_seq'::regclass);
 <   ALTER TABLE public.posts_tags ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    25225    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    25272    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            ~           2604    25197    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2606    25257    curtidas curtidas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.curtidas
    ADD CONSTRAINT curtidas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.curtidas DROP CONSTRAINT curtidas_pkey;
       public            postgres    false    221            �           2606    25245    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    219            �           2606    25283    posts_tags posts_tags_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.posts_tags
    ADD CONSTRAINT posts_tags_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.posts_tags DROP CONSTRAINT posts_tags_pkey;
       public            postgres    false    225            �           2606    25228    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    217            �           2606    25230    sessions sessions_userId_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_key" UNIQUE ("userId");
 H   ALTER TABLE ONLY public.sessions DROP CONSTRAINT "sessions_userId_key";
       public            postgres    false    217            �           2606    25276    tags tags_name_key 
   CONSTRAINT     M   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);
 <   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_name_key;
       public            postgres    false    223            �           2606    25274    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    223            �           2606    25206    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    25202    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    25204    users users_userName_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_userName_key" UNIQUE ("userName");
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT "users_userName_key";
       public            postgres    false    215            �           2606    25258    curtidas curtidas_author_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.curtidas
    ADD CONSTRAINT curtidas_author_fkey FOREIGN KEY (author) REFERENCES public.users(id);
 G   ALTER TABLE ONLY public.curtidas DROP CONSTRAINT curtidas_author_fkey;
       public          postgres    false    3210    215    221            �           2606    25263    curtidas curtidas_postId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.curtidas
    ADD CONSTRAINT "curtidas_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);
 I   ALTER TABLE ONLY public.curtidas DROP CONSTRAINT "curtidas_postId_fkey";
       public          postgres    false    219    221    3218            �           2606    25246    posts posts_author_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_fkey FOREIGN KEY (author) REFERENCES public.users(id);
 A   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_author_fkey;
       public          postgres    false    3210    215    219            �           2606    25284 !   posts_tags posts_tags_postId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_tags
    ADD CONSTRAINT "posts_tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);
 M   ALTER TABLE ONLY public.posts_tags DROP CONSTRAINT "posts_tags_postId_fkey";
       public          postgres    false    3218    225    219            �           2606    25289     posts_tags posts_tags_tagId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.posts_tags
    ADD CONSTRAINT "posts_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tags(id);
 L   ALTER TABLE ONLY public.posts_tags DROP CONSTRAINT "posts_tags_tagId_fkey";
       public          postgres    false    223    225    3224            �           2606    25231    sessions sessions_userId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.sessions DROP CONSTRAINT "sessions_userId_fkey";
       public          postgres    false    215    3210    217           