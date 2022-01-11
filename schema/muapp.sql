--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-01-11 20:06:35

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
-- TOC entry 849 (class 1247 OID 24654)
-- Name: category_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.category_type AS ENUM (
    'parent',
    'child',
    'free'
);


ALTER TYPE public.category_type OWNER TO postgres;

--
-- TOC entry 855 (class 1247 OID 24702)
-- Name: repetition; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.repetition AS ENUM (
    'once',
    'daily',
    'weekly',
    'monthly',
    'weekday'
);


ALTER TYPE public.repetition OWNER TO postgres;

--
-- TOC entry 840 (class 1247 OID 16426)
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
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 209
-- Name: call_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.call_log_id_seq OWNED BY public.call_log.id;


--
-- TOC entry 216 (class 1259 OID 24641)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    parent_id integer,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    type public.category_type
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24640)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 215
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 220 (class 1259 OID 24695)
-- Name: schedule_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule_events (
    id bigint NOT NULL,
    interval_start time without time zone NOT NULL,
    interval_end time without time zone NOT NULL,
    color character varying(7) NOT NULL,
    type public.repetition NOT NULL,
    date date NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.schedule_events OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24713)
-- Name: schedule_events_services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule_events_services (
    schedule_id integer NOT NULL,
    service_id integer NOT NULL
);


ALTER TABLE public.schedule_events_services OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24694)
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedules_id_seq OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 219
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedules_id_seq OWNED BY public.schedule_events.id;


--
-- TOC entry 218 (class 1259 OID 24662)
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    category_id integer NOT NULL,
    duration integer NOT NULL,
    price integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.services OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24661)
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_id_seq OWNER TO postgres;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 217
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


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
-- TOC entry 3399 (class 0 OID 0)
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
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3202 (class 2604 OID 16399)
-- Name: call_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_log ALTER COLUMN id SET DEFAULT nextval('public.call_log_id_seq'::regclass);


--
-- TOC entry 3210 (class 2604 OID 24644)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 24698)
-- Name: schedule_events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_events ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 24665)
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 16452)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 16418)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3378 (class 0 OID 16396)
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
-- TOC entry 3384 (class 0 OID 24641)
-- Dependencies: 216
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, parent_id, user_id, created_at, type) FROM stdin;
10	Медицинский	1	22	2021-12-24 09:08:28.292984+03	child
11	Аппаратный	1	22	2021-12-24 09:11:48.204587+03	child
12	Комбинированный	1	22	2021-12-24 09:13:26.718172+03	child
13	Японский	1	22	2021-12-24 09:14:35.100665+03	child
14	Мужской	1	22	2021-12-24 09:16:42.76154+03	child
15	Европейский	1	22	2021-12-24 09:17:28.941893+03	child
1	Маникюр	\N	22	2021-12-23 10:59:54.080216+03	parent
16	Экспресс-маникюр	1	22	2021-12-24 09:18:37.82811+03	child
6	Укрепление ногтей	\N	22	2021-12-23 11:45:10.223478+03	free
17	Детский	1	22	2021-12-25 17:28:21.630784+03	child
3	Покрытие на руках	\N	22	2021-12-23 11:14:19.41981+03	free
2	Наращивание ногтей	\N	22	2021-12-23 11:08:05.522275+03	parent
18	Покрытие шёлком	2	22	2021-12-27 20:13:15.040135+03	child
7	Снятия гель-лака	\N	22	2021-12-23 19:35:56.423693+03	free
5	Покрытие биогелем	\N	22	2021-12-23 11:44:32.156474+03	free
4	Френч, лунки	\N	22	2021-12-23 11:15:53.520575+03	child
\.


--
-- TOC entry 3388 (class 0 OID 24695)
-- Dependencies: 220
-- Data for Name: schedule_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule_events (id, interval_start, interval_end, color, type, date, user_id) FROM stdin;
\.


--
-- TOC entry 3389 (class 0 OID 24713)
-- Dependencies: 221
-- Data for Name: schedule_events_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule_events_services (schedule_id, service_id) FROM stdin;
\.


--
-- TOC entry 3386 (class 0 OID 24662)
-- Dependencies: 218
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, category_id, duration, price, user_id, created_at) FROM stdin;
13	11	30	50000	22	2022-01-06 18:05:17.698055+03
14	17	45	60000	22	2022-01-06 18:05:34.672846+03
15	18	55	70000	22	2022-01-06 18:05:51.128151+03
16	4	25	40000	22	2022-01-06 18:06:12.78422+03
\.


--
-- TOC entry 3382 (class 0 OID 16449)
-- Dependencies: 214
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, created_at, expires_in, refresh_token) FROM stdin;
27	22	2022-01-06 18:05:02.12184+03	2022-01-13 18:05:02+03	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDIwODYzMDIsImp0aSI6IjIyIiwiaXNzIjoibWFzdGVyIn0.-1UF2oTmjs5YH7VaxbqsI2bTJD7v0SMX_gNbPVVwC1M
\.


--
-- TOC entry 3380 (class 0 OID 16415)
-- Dependencies: 212
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, phone, password, email_verified, phone_verified, role, created_at) FROM stdin;
22	\N	\N	e19a@yandex.ru	+79092476376	$2a$14$QZHuxdhINajiIrItt4vRG.thJeo0Nqzl8O6XcWlJg0nYC7N26QUem	f	f	master	2021-12-11 21:38:37.564975
\.


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 209
-- Name: call_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.call_log_id_seq', 12, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 215
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 18, true);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 219
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedules_id_seq', 1, false);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 217
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 16, true);


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 213
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 27, true);


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 22, true);


--
-- TOC entry 3216 (class 2606 OID 16403)
-- Name: call_log call_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_log
    ADD CONSTRAINT call_log_pkey PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 24646)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 24700)
-- Name: schedule_events schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_events
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 24717)
-- Name: schedule_events_services schedules_services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_events_services
    ADD CONSTRAINT schedules_services_pkey PRIMARY KEY (schedule_id, service_id);


--
-- TOC entry 3225 (class 2606 OID 24667)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- TOC entry 3220 (class 2606 OID 16455)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3218 (class 2606 OID 16424)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 1259 OID 24684)
-- Name: category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX category_id ON public.services USING btree (category_id);


--
-- TOC entry 3234 (class 2606 OID 24674)
-- Name: services fk_category_id_categories_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT fk_category_id_categories_id FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3232 (class 2606 OID 24679)
-- Name: categories fk_parent_id_categories_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_parent_id_categories_id FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3236 (class 2606 OID 24718)
-- Name: schedule_events_services fk_schedule_id_schedules_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_events_services
    ADD CONSTRAINT fk_schedule_id_schedules_id FOREIGN KEY (schedule_id) REFERENCES public.schedule_events(id) ON DELETE CASCADE;


--
-- TOC entry 3237 (class 2606 OID 24723)
-- Name: schedule_events_services fk_service_id_services_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_events_services
    ADD CONSTRAINT fk_service_id_services_id FOREIGN KEY (schedule_id) REFERENCES public.services(id) ON DELETE CASCADE;


--
-- TOC entry 3235 (class 2606 OID 24736)
-- Name: schedule_events fk_user_id_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_events
    ADD CONSTRAINT fk_user_id_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3231 (class 2606 OID 24647)
-- Name: categories fk_user_id_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_user_id_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE RESTRICT;


--
-- TOC entry 3233 (class 2606 OID 24669)
-- Name: services fk_user_id_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT fk_user_id_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3230 (class 2606 OID 16456)
-- Name: sessions user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2022-01-11 20:06:35

--
-- PostgreSQL database dump complete
--

