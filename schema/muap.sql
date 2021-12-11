--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2021-12-11 19:52:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 833 (class 1247 OID 16426)
-- Name: role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role AS ENUM (
    'master',
    'client'
);


ALTER TYPE public.role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16396)
-- Name: call_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.call_log (
    id integer NOT NULL,
    phone character varying(15) NOT NULL,
    code character varying(4) NOT NULL,
    response jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    active_before timestamp with time zone NOT NULL
);


ALTER TABLE public.call_log OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16395)
-- Name: call_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.call_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.call_log_id_seq OWNER TO postgres;

--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 209
-- Name: call_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.call_log_id_seq OWNED BY public.call_log.id;


--
-- TOC entry 214 (class 1259 OID 16449)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_in timestamp with time zone NOT NULL,
    refresh_token character varying(255)
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16448)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 213
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 212 (class 1259 OID 16415)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    email character varying(320) NOT NULL,
    phone character varying(15) NOT NULL,
    password character varying(255),
    email_verified boolean DEFAULT false NOT NULL,
    phone_verified boolean DEFAULT false NOT NULL,
    role public.role NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16414)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3177 (class 2604 OID 16399)
-- Name: call_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_log ALTER COLUMN id SET DEFAULT nextval('public.call_log_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 16452)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 3179 (class 2604 OID 16418)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3332 (class 0 OID 16396)
-- Dependencies: 210
-- Data for Name: call_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.call_log (id, phone, code, response, created_at, active_before) FROM stdin;
5	+79092476376	3064	{}	2021-12-07 07:06:14+03	2021-12-07 07:06:59+03
6	+79092476376	1917	{}	2021-12-07 07:06:23+03	2021-12-07 07:07:08+03
7	+79092476376	4907	{}	2021-12-07 07:06:25+03	2021-12-07 07:07:10+03
8	+79092476376	6690	{}	2021-12-07 08:18:30+03	2021-12-07 08:19:15+03
9	+79092476376	8186	{}	2021-12-07 08:25:14+03	2021-12-07 08:25:59+03
10	+79092476376	7105	{}	2021-12-07 08:33:54+03	2021-12-07 08:34:39+03
11	+79092476376	5534	{"id": 10154547, "code": "5534", "price": "0.35", "number": "79092476376", "result": "ok"}	2021-12-07 08:41:54+03	2021-12-07 08:42:39+03
12	+79092476376	7390	{"id": 10154617, "code": "7390", "price": "0.35", "number": "79092476376", "result": "ok"}	2021-12-07 08:47:31+03	2021-12-07 08:48:31+03
\.


--
-- TOC entry 3336 (class 0 OID 16449)
-- Dependencies: 214
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, created_at, expires_in, refresh_token) FROM stdin;
2	20	2021-12-11 19:46:24.56655+03	2021-12-18 19:46:24+03	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzk4NDU5ODQsImp0aSI6IjIwIiwiaXNzIjoibWFzdGVyIn0.8k1P5644XusJ98aGxgfcbk9cCuFc6zFy77dXCeus2xg
\.


--
-- TOC entry 3334 (class 0 OID 16415)
-- Dependencies: 212
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, phone, password, email_verified, phone_verified, role, created_at) FROM stdin;
20	\N	\N	e19a@yandex.ru	+79092476376	$2a$14$MsZB/F1ZlINOP.chZ4TAm.khZIZyGATpnfV0DDKwYqz6UjggWXqdu	f	f	master	2021-12-11 19:46:24.565071
\.


--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 209
-- Name: call_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.call_log_id_seq', 12, true);


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 213
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- TOC entry 3186 (class 2606 OID 16403)
-- Name: call_log call_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_log
    ADD CONSTRAINT call_log_pkey PRIMARY KEY (id);


--
-- TOC entry 3190 (class 2606 OID 16455)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3188 (class 2606 OID 16424)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16456)
-- Name: sessions user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2021-12-11 19:52:22

--
-- PostgreSQL database dump complete
--

